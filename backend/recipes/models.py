from mongoengine import Document, StringField, DateTimeField, ReferenceField, IntField
import datetime

class Recipes(Document):
    name = StringField(required=True, max_length=100)
    description = StringField(max_length=300)
    created_at = DateTimeField(default=datetime.datetime.now)

class Ingredients(Document):
    name = StringField(required=True, max_length=100)

class Ingredient_recipes(Document):
    recipe_id = ReferenceField(Recipes, dbref=True, required=True)
    ingredient_id = ReferenceField(Ingredients, dbref=True, required=True)
    ingredient_quantity = StringField(required=True, max_length=100)