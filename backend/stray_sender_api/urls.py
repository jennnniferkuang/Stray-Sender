from django.urls import path, include
from rest_framework.routers import DefaultRouter
from stray_sender_api.views.thread import Thread, ThreadComeback, ThreadNew
from stray_sender_api.views.profile import ProfileDetail, ProfileFriendManage, ProfileFriendList
from stray_sender_api.views.feed import *
from stray_sender_api.views.message import *


urlpatterns = [
    path('thread/<int:id>', Thread.as_view()),
    path('thread/<int:id>/comeback', ThreadComeback.as_view()),
    path('post', ThreadNew.as_view()),
    path('profile/<int:pk>', ProfileDetail.as_view()),
    path('profile/<int:pk>/friend/<int:friendpk>', ProfileFriendManage.as_view()),
    path('profile/<int:pk>/friendlist', ProfileFriendList.as_view()),
    path('feed/<int:userId>/new', FeedNewStrays.as_view()),
    path('feed/<int:userId>', Feed.as_view()),
    path('feed/<int:userId>/leaderboard', FeedLeaderBoard.as_view()),

    path('message/<int:message_id>/upvote', MessageUpvote.as_view()),
    path('message/<int:message_id>/downvote', MessageDownvote.as_view()),
    path('message/rank', MessageRank.as_view())
]

