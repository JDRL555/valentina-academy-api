from rest_framework_mongoengine import serializers
from .models import Recipes,Ingredient_recipes,Ingredients

class IngredientSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'


class RecipeSerializer(serializers.DocumentSerializer):

    class Meta:
        model = Recipes
        fields = '__all__'

class IngredientRecipeSerializer(serializers.DocumentSerializer):
    # recipe_id = RecipeSerializer(many=True, read_only=True)
    # ingredient_id = IngredientSerializer(many=True, read_only=True)

    class Meta:
        model = Ingredient_recipes
        fields = '__all__'