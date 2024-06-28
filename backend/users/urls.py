from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import UsersViewSet,LogoutViewSet,RegisterViewSet,Auth_userViewSet,LoginViewSet, RolViewSet


router = SimpleRouter()
router.register(r"", UsersViewSet)


urlpatterns = [
  path("login/", LoginViewSet.as_view({ "post": "create" }), name="login"),
  path("user/change_rol/", RolViewSet.as_view({ "put": "update" }), name="rol"),
  path("register/", RegisterViewSet.as_view({ "post": "create" }), name="register"),
  path("auth/<str:token>/", Auth_userViewSet.as_view({ "get": "list" }), name="auth"),
  path("logout/<str:token>/", LogoutViewSet.as_view({ "post": "create" }), name="logout"),
] + router.urls