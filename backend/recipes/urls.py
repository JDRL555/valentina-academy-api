from django.urls import path
from rest_framework_mongoengine.routers import SimpleRouter

from .views import RecipeViewSet, IngredientViewSet

router = SimpleRouter()

router.register(r"", RecipeViewSet)

urlpatterns = [] + router.urls