from django.db import models
from authapp.models import User

class AthleticAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    achievement = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.achievement}"

class VideoHighlight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video_url = models.TextField() 
    uploaded_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"{self.user.username} - Video Highlight"