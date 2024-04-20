class MongoRouter:
  labels = {
    "recipes", "ingredients_recipes", "ingredients"
  }
  
  def db_for_read(self, model, **hints):
    if model._meta.app_label in self.labels: 
      return "postgres_db"
    return None
  
  def db_for_write(self, model, **hints):
    if model._meta.app_label in self.labels: 
      return "postgres_db"
    return None