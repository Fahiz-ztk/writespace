from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User


class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserStoryView(viewsets.ModelViewSet):
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Story.objects.filter(author=self.request.user)
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class AllStoriesView(viewsets.ReadOnlyModelViewSet):
    serializer_class = StorySerializer
    queryset = Story.objects.all().order_by('-id')
