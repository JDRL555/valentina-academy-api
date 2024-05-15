   
from django.urls import path, re_path, include
from django.contrib import admin

from users.urls import urlpatterns as user_views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('users/', include(user_views))
]
