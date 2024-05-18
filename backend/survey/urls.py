from django.urls import path

from . import views

urlpatterns = [
  path("", views.get_surveys),
  path("new", views.create_survey),
]