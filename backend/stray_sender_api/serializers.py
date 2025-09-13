from rest_framework import serializers
from stray_sender_api.models import User, Profile, Friendship, Message, Thread, Vote

class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'is_staff', 'date_joined']
        read_only_fields = ['id', 'date_joined']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Hash password when creating user
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for Profile model"""
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Profile
        fields = ['user', 'name', 'desc', 'emoji', 'picture_url', 'username', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']


class FriendshipSerializer(serializers.ModelSerializer):
    """Serializer for Friendship model"""
    user_username = serializers.CharField(source='user.username', read_only=True)
    friend_username = serializers.CharField(source='friend.username', read_only=True)
    
    class Meta:
        model = Friendship
        fields = ['id', 'user', 'friend', 'user_username', 'friend_username', 'created_at']
        read_only_fields = ['id', 'created_at']


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for Message model"""
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    target_username = serializers.CharField(source='target.username', read_only=True)
    
    class Meta:
        model = Message
        fields = [
            'id', 'thread', 'sender', 'target', 'content', 'upvotes', 
            'downvotes', 'score', 'sender_username', 'target_username', 'created_at'
        ]
        read_only_fields = ['id', 'upvotes', 'downvotes', 'score', 'created_at']


class ThreadSerializer(serializers.ModelSerializer):
    """Serializer for Thread model"""
    initiator_username = serializers.CharField(source='initiator.username', read_only=True)
    target_username = serializers.CharField(source='target.username', read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    latest_message = serializers.SerializerMethodField()
    
    class Meta:
        model = Thread
        fields = [
            'id', 'initiator', 'target', 'initiator_username', 'target_username',
            'current_streak', 'messages', 'latest_message', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'current_streak', 'created_at', 'updated_at']
    
    def get_latest_message(self, obj):
        """Get the latest message in the thread"""
        latest = obj.messages.first()  # Due to ordering = ['-created_at']
        return MessageSerializer(latest).data if latest else None


class VoteSerializer(serializers.ModelSerializer):
    """Serializer for Vote model"""
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Vote
        fields = ['id', 'user', 'message', 'vote_type', 'user_username', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def validate(self, data):
        """Ensure user hasn't already voted on this message"""
        user = data.get('user')
        message = data.get('message')
        
        if Vote.objects.filter(user=user, message=message).exists():
            raise serializers.ValidationError("User has already voted on this message")
        
        return data


# Nested serializers for detailed views
class UserDetailSerializer(UserSerializer):
    """Detailed user serializer with profile information"""
    profile = ProfileSerializer(read_only=True)
    
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['profile']


class ThreadDetailSerializer(ThreadSerializer):
    """Detailed thread serializer with participant profiles"""
    initiator_profile = ProfileSerializer(source='initiator.profile', read_only=True)
    target_profile = ProfileSerializer(source='target.profile', read_only=True)
    
    class Meta(ThreadSerializer.Meta):
        fields = ThreadSerializer.Meta.fields + ['initiator_profile', 'target_profile']
