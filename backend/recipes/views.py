from rest_framework_mongoengine import viewsets
from rest_framework.response import Response
from .models import Recipes, Ingredients
from .serializers import RecipeSerializer, IngredientSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredients.objects()
    serializer_class = IngredientSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipes.objects.all()  
    serializer_class = RecipeSerializer

    def list(self, request):
        recipes = []
        for recipe in self.queryset:
            recipe_obj =   {
                    "id": str(recipe.id),
                    "name": recipe.name,
                    "description": recipe.description,
                    "created_at": recipe.created_at,
                    "ingredients":[],
                    "steps": recipe.steps,
                }
            for ingredient in recipe.ingredient:
                try:
                    ingredient_obj = Ingredients.objects.get(id=str(ingredient.id))
                    recipe_obj ["ingredients"].append({ 
                        "id": str(ingredient_obj.id), 
                        "name": ingredient_obj.name 
                    })
                except Exception as error:
                    print(error)
                    return Response({"error":"ingrediente no encontrado"})
            recipes.append(recipe_obj)
            print(recipes)
        return Response(recipes)
    
#iterar los id despues de eso con cada id hacer la consulta al modelo ingredient y eso agregarcelo al objecto recipe 
    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = self.get_serializer(obj)
        recipe_obj = serializer.data
        recipe_obj["ingredients"] = []

        for ingredient_obj in recipe_obj["ingredient"]:
            try:
                ingredient = Ingredients.objects.get(id=ingredient_obj)
                recipe_obj["ingredients"].append ({ 
                    "id": str(ingredient.id), 
                    "name": ingredient.name 
                })
            except Exception as error:
                print(error)
                return Response({"error":"error con los ingredients"})
        del recipe_obj["ingredient"]
        return Response(recipe_obj)
        


        

       
