from rest_framework import serializers
from .models import Event, EventParticipant

class EventParticipantSerializer(serializers.ModelSerializer):
    event = serializers.ReadOnlyField(source='event.title')
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = EventParticipant
        fields = ['id', 'event', 'user']
        
class EventSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    participants = EventParticipantSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'event_date', 'location', 'status', 'created_by', 'created_at', 'google_meet_url', 'participants']


