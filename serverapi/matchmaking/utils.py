from authapp.models import AthleteProfile, AgentProfile

def find_matches(agent_profile):
    if agent_profile.sport is None or agent_profile.user.location is None:
        return []
    
    agent_sport = agent_profile.sport.lower().strip()
    agent_location = agent_profile.user.location.lower().strip()

    potential_matches = AthleteProfile.objects.filter(
        sport__iexact=agent_sport, 
        user__location__iexact=agent_location 
    )

    return potential_matches

def find_matching_agents(athlete_profile):
    if athlete_profile.sport is None or athlete_profile.user.location is None:
        return []
    
    athlete_sport = athlete_profile.sport.lower().strip()
    athlete_location = athlete_profile.user.location.lower().strip()

    potential_agents = AgentProfile.objects.filter(
        sport__iexact=athlete_sport,
        user__location__iexact=athlete_location
    )

    return potential_agents