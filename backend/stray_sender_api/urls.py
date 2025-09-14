from django.urls import path, include
from rest_framework.routers import DefaultRouter
from stray_sender_api.views.thread import Thread


urlpatterns = [
    path('thread/<int:id>', Thread.as_view()),
]

