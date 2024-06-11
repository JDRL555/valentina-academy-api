from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import SurveysViewSet, AnswersViewSet, QuestionsViewSet, AnswersQuestionViewSet  

router = SimpleRouter()




urlpatterns = [
] + router.urls