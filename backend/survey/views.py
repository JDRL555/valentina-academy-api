from rest_framework.decorators import api_view
from rest_framework_mongoengine import viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import Surveys, Answers, Questions
from .serializers import SurveySerializer, QuestionSerializer, AnswersSerializer 

from api.utils.mongo import connectToMongo 
from courses.models import Courses

import os

# Create your views here.

class SurveysViewSet(viewsets.ModelViewSet):
    queryset = Surveys.objects()
    serializer_class = SurveySerializer

class AnswersViewSet(viewsets.ModelViewSet):
    queryset = Answers.objects()
    serializer_class = AnswersSerializer

class QuestionsViewSet(viewsets.ModelViewSet):
    queryset = Questions.objects()
    serializer_class = QuestionSerializer

