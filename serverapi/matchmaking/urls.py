from django.urls import path
from .views import match_athletes, match_agents

urlpatterns = [
    path('match/', match_athletes, name='match_athletes'),
    path('athlete-match/', match_agents, name='match_agents'),
]
