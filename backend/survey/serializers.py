from rest_framework_mongoengine import serializers
from .models import Answers, Questions, Surveys

class AnswersSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Answers
        fields = '__all__'
class QuestionSerializer(serializers.DocumentSerializer):
    answers = AnswersSerializer(many=True)
    class Meta:
        model = Questions
        fields = '__all__'

class SurveySerializer(serializers.DocumentSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Surveys
        fields = '__all__'