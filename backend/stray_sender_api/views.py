# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import stray_sender_api.models as models
import stray_sender_api.serializers as serializers

@api_view(['GET'])
def threads(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
       threads = models.Thread.objects.all() 
       serializer = serializers.ThreadSerializer(threads, many=True)
       return Response(serializer.data)

