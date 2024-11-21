from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from authapp.models import AgentProfile, AthleteProfile
from .utils import find_matches, find_matching_agents

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def match_athletes(request):
    user = request.user

    if user.role != 'agent':
        return Response({'error': 'Only agents can use matchmaking'}, status=400)

    try:
        agent_profile = AgentProfile.objects.get(user=user)
        matches = find_matches(agent_profile)

        if not matches:
            return Response({'matches': []})

        match_data = [
            {
                'id': athlete.user.id,
                'username': athlete.user.username,
                'sport': athlete.sport,
                'location': athlete.user.location,
            }
            for athlete in matches
        ]

        return Response({'matches': match_data}, status=200)

    except AgentProfile.DoesNotExist:
        return Response({'error': 'Agent profile not found'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def match_agents(request):
    user = request.user

    if user.role != 'athlete':
        return Response({'error': 'Only athletes can use matchmaking'}, status=400)

    try:
        athlete_profile = AthleteProfile.objects.get(user=user)

        matching_agents = find_matching_agents(athlete_profile)

        agent_data = [
            {
                'id': agent.user.id,
                'username': agent.user.username,
                'sport': agent.sport,
                'location': agent.user.location,
            }
            for agent in matching_agents
        ]

        return Response({'matches': agent_data}, status=200)

    except AthleteProfile.DoesNotExist:
        return Response({'error': 'Athlete profile not found'}, status=404)