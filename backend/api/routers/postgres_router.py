class PostgresRouter:
  labels = {
    "auth", "contenttypes", "sessions", "admin", 
    "category", "courses", "course_media", "purchased_courses", 
    "posts", "post_media",
  }
  
  def db_for_read(self, model, **hints):
    if model._meta.app_label in self.labels: 
      return "postgres_db"
    return None
  
  def db_for_write(self, model, **hints):
    if model._meta.app_label in self.labels: 
      return "postgres_db"
    return None