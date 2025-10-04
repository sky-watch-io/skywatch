import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.post('/', async (c) => {
  try {
    // Get data from query parameters or request body
    const data = await c.req.json().catch(() => ({}))

    // Send data to the pipeline stream
    await c.env.SKYWATCH_INGESTION_PIPELINE_STREAM.send(data)

    return c.json({
      success: true,
      message: 'Data ingested into pipeline successfully'
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return c.json({
      success: false,
      error: 'Failed to process request'
    }, 500)
  }
})

export default app
