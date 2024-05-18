   
from django.urls import path, re_path, include
from django.contrib import admin

from users.urls import urlpatterns as user_views
from recipes.urls import urlpatterns as recipe_views
from survey.urls import urlpatterns as survey_views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('users/', include(user_views)),
    re_path('recipe/', include(recipe_views)),
    re_path("surveys/", include(survey_views))
]
