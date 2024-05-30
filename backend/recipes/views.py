# from rest_framework import viewsets
from rest_framework_mongoengine import viewsets
from rest_framework.response import Response
from .models import Recipes, Ingredients
from .serializers import RecipeSerializer, IngredientSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipes.objects()
    serializer_class = RecipeSerializer
    
    
class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredients.objects()
    serializer_class = IngredientSerializer