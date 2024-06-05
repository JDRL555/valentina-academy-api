from rest_framework_mongoengine import serializers
from .models import Answers, Questions, Surveys, AnswersQuestion


class SurveySerializer(serializers.DocumentSerializer):
  class Meta:
    model = Surveys
    fields = '__all__'
    
class QuestionSerializer(serializers.DocumentSerializer):
  class Meta:
    model = Questions
    fields = '__all__'

class AnswersSerializer(serializers.DocumentSerializer):

  class Meta:
    model = Answers
    fields = '__all__'