from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.request import Request
from django.db.models import Q
import stray_sender_api.models as models
import stray_sender_api.serializers as serializers

class FeedNewStrays(APIView):
    """
    Retrieve the latest threads.
    """
    def get(self, request: Request, userId: int):
        max_msg = request.query_params.get('max', 3)
        msgs = models.Message.objects.filter(target_id = userId, read = False).order_by('-created_at')[:max_msg]
        serializer = serializers.MessageSerializer(msgs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class Feed(APIView):
    """
    Retrieve the latest threads.
    """
    def get(self, request: Request, userId: int):
        max_msg = request.query_params.get('max', 3)
        threads = models.Thread.objects.filter(Q(initiator_id=userId) | Q(target_id=userId)).order_by('-created_at')[:max_msg]
        serializer = serializers.ThreadSerializer(threads, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FeedLeaderBoard(APIView):
    """
    Retrieve the leaderboard messages.
    """
    def get(self, request: Request, userId: int):
        max_msg = request.query_params.get('max', 3)
        msgs = models.Message.objects.all().order_by('-score', '-created_at')[:max_msg]
        serializer = serializers.MessageSerializer(msgs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

