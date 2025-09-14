from django.urls import path, include
from rest_framework.routers import DefaultRouter
from stray_sender_api.views.thread import Thread, ThreadComeback, ThreadNew
from stray_sender_api.views.profile import ProfileDetail

urlpatterns = [
    path('thread/<int:id>', Thread.as_view()),
    path('thread/<int:id>/comeback', ThreadComeback.as_view()),
    path('post', ThreadNew.as_view()),
    path('profile/<int:pk>', ProfileDetail.as_view()),
]

