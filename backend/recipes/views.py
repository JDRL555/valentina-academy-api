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
    
    def list(self,request):
        queryset = list(self.queryset)
        newList = []

        for ingredients_recipes in queryset:
            newObj = {}
            recipes = Recipes.objects.get(id=str(ingredients_recipes["recipes"]["id"]))
            ingredients = Ingredients.objects.get(id=str(ingredients_recipes["ingredients"]["id"]))

            newObj["id"] = str(ingredients_recipes["id"])

            newObj["recipes"] = {
                "name": recipes.name,
                "description": recipes.description,
                "created_at": recipes.created_at,
            }

            newObj["ingredients"] = {
                "name": ingredients.name,
            }

            newObj["ingredient_quantity"] = ingredients_recipes["ingredient_quantity"]

            newList.append(newObj)

        return Response(newList)
    
    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = self.get_serializer(obj)
        ingredients_recipes = serializer.data

        recipes = Recipes.objects.get(id=ingredients_recipes["recipes"])
        ingredients = Ingredients.objects.get(id=ingredients_recipes["ingredients"])
        
        ingredients_recipes["recipes"] = {
                "name": recipes.name,
                "description": recipes.description,
                "created_at": recipes.created_at,
                }

        ingredients_recipes["ingredients"] = {
                "name": ingredients.name,
                }
        
        ingredients_recipes["ingredient_quantity"] = ingredients_recipes["ingredient_quantity"]

        return Response(ingredients_recipes)