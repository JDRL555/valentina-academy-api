from mongoengine import Document, StringField, IntField, DateField, ReferenceField
import datetime


class Recipes(Document):
  name = StringField(required=True, max_length=100)
  description = StringField(max_length=300)
  created_at = DateField(default=datetime.datetime.now())

class Ingredients(Document):
  name = StringField(required=True, max_length=100)

class Ingredient_recipes(Document):
  recipe_id = ReferenceField(Recipes)
  ingredient_id = ReferenceField(Ingredients)
  ingredient_quantity = IntField(min_value=1)