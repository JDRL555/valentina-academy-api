from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

from django.contrib.auth.models import User

from .serializers import UserSerializer

class UsersViewSet(ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  
  @action(detail=False, methods=['POST'])
  def login(self, request):
    global user
    
    try:
      user = User.objects.get(username=request.data['username'])
    except:
      return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)
    
    if not user.check_password(request.data['password']):
      return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
    
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)

    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)
  
  @action(detail=False, methods=['POST'])
  def register(self, request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
      serializer.save()
      
      user = User.objects.get(username=serializer.data['username'])
      user.set_password(serializer.data['password'])
      user.save()
      
      return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)