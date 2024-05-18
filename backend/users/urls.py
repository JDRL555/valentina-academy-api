   
from django.urls import re_path

from . import views

urlpatterns = [
    re_path('login', views.login),
    re_path('register', views.register),
    re_path('get', views.get_users),
    re_path('user/<int:pk>/', views.user_id),
]
