from rest_framework import generics
import stray_sender_api.models as models
import stray_sender_api.serializers as serializers

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

