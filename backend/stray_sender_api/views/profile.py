from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
import stray_sender_api.models as models
import stray_sender_api.serializers as serializers

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

class ProfileFriendManage(APIView):
    """
    Create a new friendship with another user.
    """
    def put(self, request, pk, friendpk, format=None):
        friendship = models.Friendship(
                user_id=pk,
                friend_id=friendpk,
                )
        friendship.save()
        return ProfileFriendList.get(request, pk, format)
    
    """
    Remove a friendship with another user.
    """
    def delete(self, request, pk, friendpk, format=None):
        friendship = models.Friendship.objects.get(user_id=pk, friend_id=friendpk)
        friendship.delete()
        return ProfileFriendList.get(request, pk, format)

class ProfileFriendList(APIView):
    """
    Get a list of friends this user has.
    """
    @staticmethod
    def get(request, pk, format=None):
        return Response([serializers.UserSerializer(f.friend).data for f in models.Friendship.objects.filter(user_id=pk)])

