from django.db import models
from authapp.models import User

class Rating(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_ratings') 
    reviewed_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_ratings')
    rating = models.IntegerField() 
    review = models.TextField(blank=True, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.reviewer.username} rated {self.reviewed_user.username}'

    class Meta:
        unique_together = ('reviewer', 'reviewed_user') 
