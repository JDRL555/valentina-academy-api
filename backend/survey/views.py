from rest_framework_mongoengine import viewsets, serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError

from .models import Surveys, Answers, Questions
from .serializers import SurveySerializer, QuestionSerializer, AnswersSerializer

class SurveysViewSet(viewsets.ModelViewSet):
    queryset = Surveys.objects()
    serializer_class = SurveySerializer

    def list(self, request):
        surveys = []
        for survey in self.queryset:
            survey_obj = {
                "id": str(survey.id),
                "title": survey.title,
                "description": survey.description,
                "course": survey.course_id,
                "created_at": survey.created_at,
                "questions": [],
            }
            for question in survey.question_id:
                if question.answers_id: 
                    try:
                        question_obj = Questions.objects.get(id=str(question.id))
                        for answer_id in question.answers_id: 
                            answer_obj = Answers.objects.get(id=str(answer_id.id))
                            survey_obj["questions"].append({
                                "id": str(question_obj.id),
                                "question": question_obj.question,
                                "answers": [
                                    {"answer": answer_obj.answer, "is_correct": answer_obj.is_correct}
                                ],
                            })
                    except Exception as error:
                        print(error)
            surveys.append(survey_obj)
        return Response(surveys)
    
    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = self.get_serializer(obj)
        survey_obj = serializer.data
        survey_obj["questions"] = []

        for question_id in  survey_obj["question_id"]:
            try:
                question_obj = Questions.objects.get(id=question_id)
                question_list = {
                        "id": str(question_obj.id),
                        "question": question_obj.question,
                        "answers": []
                    }
                for answer_id in question_obj.answers_id:
                    answer_obj = Answers.objects.get(id=str(answer_id.id))
                    answers = {
                        "answer": answer_obj.answer,
                        "is_correct": answer_obj.is_correct,
                    }
                    print(answers,"<------------")
                    question_list["answers"].append(answers)
                survey_obj["questions"].append(question_list)
                
            except Exception as error:
                print(error)
                return Response({"error":"error en obtener el id"})
        del survey_obj["question_id"]
        return Response(survey_obj)
    







class QuestionsViewSet(viewsets.ModelViewSet):
    queryset = Questions.objects()
    serializer_class = QuestionSerializer

    

    def create(self, request, *args, **kwargs ):
        datos = request.data
        serializador = self.serializer_class(data=datos)
        answer = datos.get('answers_id')

        if not serializador.is_valid():
            return Response(serializador.errors)
        
        if not "answers_id" in datos.keys():
             return Response({'answers_id': 'El valor de "answers_id" no se a encontrado'})

        else:
            if type(answer) != list:
                 return Response({'answers_id': 'El valor de "answers_id" no es un arreglo'})
            else:
                if len(answer) == 0:
                     return Response({'answers_id': 'la lista "answers_id" esta vacio'})
                else:
                    for answer_id in answer: 
                        try:
                            Answers.objects.get(id=answer_id)
                        except Answers.DoesNotExist:
                            return Response({'answers_id': f'No se encontró la respuesta con el ID: {answer_id}'})
        serializador.save()
        return Response(serializador.data)
    

    def list(self, request):
        questions = []
        for question in self.queryset:
            question_obj =   {
                    "id": str(question.id),
                    "question": question.question,
                    "answers":[],
                }
            for answers in question.answers_id:
                try:
                    answers_obj = Answers.objects.get(id=str(answers.id))
                    question_obj ["answers"].append({ 
                        "answer": answers_obj.answer,
                        "is_correct": answers_obj.is_correct, 
                    })
                except Exception as error:
                    print(error)
                    return Response({"error":"respuesta no encontrado"})
            questions.append(question_obj)
        return Response(questions)
 
    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = self.get_serializer(obj)
        question_obj = serializer.data
        question_obj["answers"] = []

        for answers in question_obj["answers_id"]:
            try:
                answers_obj = Answers.objects.get(id=answers)
                question_obj["answers"].append ({ 
                    "answer": answers_obj.answer, 
                    "is_correct": answers_obj.is_correct 
                })
            except Exception as error:
                print(error)
                return Response({"error":"error con los answers"})
        del question_obj["answers_id"]
        return Response(question_obj)
        


class AnswersViewSet(viewsets.ModelViewSet):
    queryset = Answers.objects()
    serializer_class = AnswersSerializer