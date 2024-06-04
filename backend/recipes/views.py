# from rest_framework import viewsets
from rest_framework_mongoengine import viewsets
from rest_framework.response import Response
from .models import Recipes, Ingredients, Ingredient_recipes
from .serializers import RecipeSerializer, IngredientSerializer, IngredientRecipeSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipes.objects()
    serializer_class = RecipeSerializer
    
    
class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredients.objects()
    serializer_class = IngredientSerializer

class IngredientRecipeViewSet(viewsets.ModelViewSet):
    queryset = Ingredient_recipes.objects()
    serializer_class = IngredientRecipeSerializer
    