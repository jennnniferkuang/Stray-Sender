from django.db import models


class User(models.Model):
    """Custom user model"""
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


class Profile(models.Model):
    """User profile information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=100)
    desc = models.TextField(blank=True)
    emoji = models.CharField(max_length=10, blank=True)
    picture_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} (@{self.user.username})"


class Friendship(models.Model):
    """Many-to-many friendship relationship"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendships')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_of')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'friend')
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['friend']),
        ]

    def __str__(self):
        return f"{self.user.username} -> {self.friend.username}"


class Thread(models.Model):
    """Conversation thread between users"""
    initiator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='initiated_threads')
    target = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_threads', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Cached fields for leaderboard performance
    current_streak = models.PositiveIntegerField(default=0)

    class Meta:
        indexes = [
            models.Index(fields=['initiator']),
            models.Index(fields=['target']),
            models.Index(fields=['updated_at']),
            models.Index(fields=['created_at']),
            # Leaderboard indexes
            models.Index(fields=['-current_streak']),
        ]

#    @classmethod
#    def get_leaderboard(cls, user_id=None, max_results=3):
#        """Get top threads for leaderboard"""
#        queryset = cls.objects.select_related('initiator__profile', 'target__profile').annotate(
#            latest_message=models.Subquery(
#                Message.objects.filter(thread=models.OuterRef('pk'))
#                .order_by('-created_at')
#                .values('id', 'content', 'upvotes', 'downvotes')[:1]
#            )
#        ).order_by('-current_streak', '-total_score', '-updated_at')
#        
#        if user_id:
#            # Filter threads involving the user
#            queryset = queryset.filter(
#                models.Q(initiator_id=user_id) | models.Q(target_id=user_id)
#            )
#            
#        return queryset[:max_results]

    def __str__(self):
        return f"Thread: {self.initiator.username} -> {self.target.username} (Streak: {self.current_streak})"

class Message(models.Model):
    """Individual message within a thread"""
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    target = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages', null = True)
    content = models.TextField()
    upvotes = models.PositiveIntegerField(default=0)
    downvotes = models.PositiveIntegerField(default=0)
    score = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=['thread', '-created_at']),
            models.Index(fields=['sender']),
            models.Index(fields=['target']),
            models.Index(fields=['-score']),
            models.Index(fields=['-created_at']),
        ]
        ordering = ['-created_at'] 

    def __str__(self):
        return f"Message by {self.sender.username}: {self.content[:50]}..."

class Vote(models.Model):
    """Track user votes on messages to prevent duplicate voting"""
    VOTE_CHOICES = [
        ('up', 'Upvote'),
        ('down', 'Downvote'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='votes')
    vote_type = models.CharField(max_length=4, choices=VOTE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'message')
        indexes = [
            models.Index(fields=['message']),
            models.Index(fields=['user']),
        ]

    def __str__(self):
        return f"{self.user.username} {self.vote_type}voted message {self.message.id}"

