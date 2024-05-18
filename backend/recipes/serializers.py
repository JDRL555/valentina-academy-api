from rest_framework import serializers
from .models import Recipes,Ingredient_recipes,Ingredients

class RecipesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Recipes
    fields = ['name','description','created_at']

class IngredientsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Ingredients
    fields = ['name']

class Ingredient_recipesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Ingredient_recipes
    fields = ['recipe_id','ingredient_id','ingredient_quantity']