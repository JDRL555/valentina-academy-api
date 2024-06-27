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
        queryset = Recipes.objects.all()  
        for recipe in queryset:
            recipe_obj =   {
                    "id": str(recipe.id),
                    "name": recipe.name,
                    "description": recipe.description,
                    "created_at": recipe.created_at,
                    "ingredient":[],
                    "steps": recipe.steps,
                }
            for ingredient in recipe.ingredient:
                try:
                    ingredient_obj = Ingredients.objects.get(id=str(ingredient.id))
                    recipe_obj ["ingredient"].append({ 
                        "id": str(ingredient_obj.id), 
                        "name": ingredient_obj.name 
                    })
                except Exception as error:
                    print(error)
                    return Response({"error":"ingrediente no encontrado"})
            recipes.append(recipe_obj)
        return Response(recipes)
    
    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = self.get_serializer(obj)
        recipe_obj = serializer.data
        recipe_obj["ingredient"] = []

        for ingredient_obj in recipe_obj["ingredient"]:
            try:
                ingredient = Ingredients.objects.get(id=ingredient_obj)
                recipe_obj["ingredients"].append ({ 
                    "id": str(ingredient.id), 
                    "name": ingredient.name 
                })
            except Exception as error:
                print(error)
                return Response({"error":"error con los ingredient"})
        del recipe_obj["ingredient"]
        return Response(recipe_obj)
    
    def partial_update(self, request, *args, **kwargs):
        recipe = self.get_object()
        ingredients = []
        
        if request.data.get("name"): 
            recipe.name = request.data.get("name")
        
        if request.data.get("description"): 
            recipe.description = request.data.get("description")
        
        if request.data.get("ingredient"): 
            recipe.ingredient = request.data.get("ingredient")
            
            for ingredient_id in recipe.ingredient:
                ingredient_obj = Ingredients.objects.get(id=ingredient_id)
                ingredients.append(ingredient_obj)
                
        recipe.ingredient = ingredients
        
        if request.data.get("steps"): 
            recipe.steps = request.data.get("steps")
            
        recipe.save()

        return Response({
            "name": recipe.name,
            "description": recipe.description,
            "ingredient": [str(ingredient.id) for ingredient in recipe.ingredient],
            "steps": recipe.steps
        })