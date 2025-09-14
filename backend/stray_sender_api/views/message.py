from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.request import Request
from django.db.models import Q

from stray_sender_api import serializers, models

class MessageUpvote(APIView):
    """
    Upvote a message.
    """
    def post(self, request: Request, message_id: int):
        user_id = request.data.get('userId')
        if not user_id:
            return Response({"userError": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            message = models.Message.objects.filter(id=message_id).get()
        except models.Message.DoesNotExist:
            return Response({"userError": "Message not found"}, status=status.HTTP_404_NOT_FOUND)

        vote, created = models.Vote.objects.get_or_create(user_id=user_id, message=message)
        if not created and vote.vote_type == 'upvote':
            return Response({"userError": "User has already upvoted this message"}, status=status.HTTP_400_BAD_REQUEST)

        if not created and vote.vote_type == 'downvote':
            message.downvotes -= 1

        message.upvotes += 1
        message.score += 1
        vote.vote_type = 'upvote'
        vote.save()
        message.save()
        seralizer = serializers.MessageSerializer(message)
        return Response(seralizer.data, status=status.HTTP_200_OK)

class MessageDownvote(APIView):
    """
    Downvote a message.
    """
    def post(self, request: Request, message_id: int):
        user_id = request.data.get('userId')
        if not user_id:
            return Response({"userError": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            message = models.Message.objects.filter(id=message_id).get()
        except models.Message.DoesNotExist:
            return Response({"userError": "Message not found"}, status=status.HTTP_404_NOT_FOUND)

        vote, created = models.Vote.objects.get_or_create(user_id=user_id, message=message)
        if not created and vote.vote_type == 'downvote':
            return Response({"userError": "User has already downvoted this message"}, status=status.HTTP_400_BAD_REQUEST)

        if not created and vote.vote_type == 'upvote':
            message.upvotes -= 1
    
        message.downvotes += 1
        message.score -= 1
        vote.vote_type = 'downvote'
        vote.save()
        message.save()
        seralizer = serializers.MessageSerializer(message)
        return Response(seralizer.data, status=status.HTTP_200_OK)

