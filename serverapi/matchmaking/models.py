from django.db import models
from authapp.models import User

class MatchHistory(models.Model):
    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='agent_matches')
    athlete = models.ForeignKey(User, on_delete=models.CASCADE, related_name='athlete_matches')
    match_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.agent.username} matched with {self.athlete.username} on {self.match_date}"