from mongoengine import Document, StringField, IntField, DateField, BooleanField, ReferenceField

import datetime

# Create your models here.
class Answers(Document):
  answer = StringField(required=True, max_length=500)
  is_correct = BooleanField(default=False)

class Questions(Document):
  question = StringField(max_length=300)

class AnswersQuestion(Document):
  question = ReferenceField(Questions)
  answer = ReferenceField(Answers)

class Surveys(Document):
  title = StringField(required=True, max_length=50)
  description = StringField(max_length=100)
  course_id = IntField(required=True)
  question_id = ReferenceField(AnswersQuestion)
  created_at = DateField(default=datetime.datetime.now())