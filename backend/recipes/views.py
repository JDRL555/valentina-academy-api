from rest_framework import generics

from .models import Recipes,Ingredient_recipes,Ingredients
from .serializers import Ingredient_recipesSerializer,RecipesSerializer,IngredientsSerializer

class Recipes_class(generics.ListCreateAPIView):
  serializer_class = RecipesSerializer  
  
  def recipe(self):
    list_Recipe = Recipes.objects.all()
    return list_Recipe


class Ingredient_recipes_class(generics.ListCreateAPIView):
  serializer_class = Ingredient_recipesSerializer  
  
  def ingredent_recipe(self):
    list_ing_rec = Ingredient_recipes.objects.all()
    return list_ing_rec


class Ingredients_class(generics.ListCreateAPIView):
  serializer_class = IngredientsSerializer  
  
  def ingredents(self):
    list_ingredents = Ingredients.objects.all()
    return list_ingredents
