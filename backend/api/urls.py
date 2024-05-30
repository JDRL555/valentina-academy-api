   
from django.urls import path, re_path, include
from django.contrib import admin

from users.urls import urlpatterns as user_views
from recipes.urls import urlpatterns as recipe_views
from survey.urls import urlpatterns as survey_views
from courses.urls import urlpatterns as courses_views

urlpatterns = [
    path("courses/", include(courses_views)),
    path('admin/', admin.site.urls),
    path('users/', include(user_views)),
    path('recipes/', include(recipe_views)),
    path("surveys/", include(survey_views)),
    
]
