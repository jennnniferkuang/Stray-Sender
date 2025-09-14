# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
import stray_sender_api.models as models
import stray_sender_api.serializers as serializers

class Thread(APIView):
    """
    Get a thread by ID.
    """
    def get(self, request, id, format=None):
       thread = models.Thread.objects.get(id=id)
       serializer = serializers.ThreadSerializer(thread)
       return Response(serializer.data)

