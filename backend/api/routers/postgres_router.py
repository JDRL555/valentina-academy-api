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
  
  def allow_relation(self, obj1, obj2, **hints):
    if obj1._meta.app_label in self.labels or obj2._meta.app_label in self.labels:
      return True
    return None
  
  def allow_migrate(self, db, app_label, model_name=None, **hints):
    if app_label in self.labels:
      return db == "postgres_db"
    return None