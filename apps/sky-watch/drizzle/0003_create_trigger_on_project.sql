-- Custom SQL migration file, put your code below! --
CREATE OR REPLACE FUNCTION notify_project_change()
RETURNS trigger AS $$
DECLARE
  payload JSON;
BEGIN
  payload := json_build_object(
    'operation', TG_OP,         -- INSERT / UPDATE
    'id', NEW.id,
    'name', NEW.name,
    'domain', NEW.domain,
    'slug', NEW.slug,
    'userId', NEW.user_id,
    'organizationId', NEW.organization_id,
    'hasData', NEW.has_data,
    'createdAt', NEW.created_at,
    'updatedAt', NEW.updated_at
  );

  PERFORM pg_notify('project_changes', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS project_change_trigger ON project;

CREATE TRIGGER project_change_trigger
AFTER INSERT OR UPDATE ON project
FOR EACH ROW
EXECUTE FUNCTION notify_project_change();