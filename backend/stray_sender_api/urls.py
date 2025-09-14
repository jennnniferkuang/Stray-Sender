from django.urls import path, include
from rest_framework.routers import DefaultRouter
from stray_sender_api.views.thread import Thread, ThreadComeback


urlpatterns = [
    path('thread/<int:id>', Thread.as_view()),
    path('thread/<int:id>/comeback', ThreadComeback.as_view()),
]

