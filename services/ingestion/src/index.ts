import { Hono } from 'hono'
import { upgradeWebSocket } from 'hono/cloudflare-workers'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get(
  '/ws',
  upgradeWebSocket((c) => {
    return {
      async onMessage(event, ws) {
        const data = JSON.parse(event.data)
        await c.env.SKYWATCH_INGESTION_PIPELINE_STREAM.send(data);
        ws.send('Hello from server!')
      },
      onClose: () => {
        console.log('Connection closed')
      },
    }
  })
)

export default app
