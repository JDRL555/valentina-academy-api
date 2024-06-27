from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import UsersViewSet


router = SimpleRouter()
router.register(r"", UsersViewSet)

urlpatterns = [
  path("login/", UsersViewSet.as_view({ "post": "login" }), name="login"),
  path("register/", UsersViewSet.as_view({ "post": "register" }), name="register"),
  path("auth/<str:token>/", UsersViewSet.as_view({ "get": "auth_user" }), name="auth"),
  path("logout/<str:token>/", UsersViewSet.as_view({ "post": "logout" }), name="logout"),
] + router.urls