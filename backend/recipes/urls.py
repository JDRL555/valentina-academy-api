from django.urls import re_path

from .views import Ingredient_recipes_class,Ingredients_class,Recipes_class

# from .views import render

urlpatterns = [
  re_path('recipes/', Recipes_class.as_view()),
  re_path('ingredients/', Ingredients_class.as_view()),
  re_path('ingredients_recipes/', Ingredient_recipes_class.as_view()),
]
