from ..views import IngredientRecipeViewSet
from rest_framework_mongoengine.routers import SimpleRouter

router = SimpleRouter()

router.register(r"", IngredientRecipeViewSet)


urlpatterns = [] + router.urls