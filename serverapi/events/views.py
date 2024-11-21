from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Event, EventParticipant
from .serializers import EventSerializer, EventParticipantSerializer
from django.core.exceptions import ValidationError
from dateutil.parser import parse
from datetime import datetime
from django.db.models import Q

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    data = request.data
    try:
        year, month, day = map(int, data['event_date'].split('-'))
        event_date = datetime(year, month, day)
    except (ValueError, TypeError, KeyError) as e:
        return Response( {"error": "Invalid date format. Please use YYYY-MM-DD."}, 
            status=status.HTTP_400_BAD_REQUEST)
    google_meet_url = data.get('google_meet_url', '')
    
    event = Event.objects.create(
        title=data['title'],
        description=data.get('description', ''),
        event_date=event_date,
        location=data.get('location', ''),
        created_by=request.user,
        google_meet_url=google_meet_url,
    )

    EventParticipant.objects.create(event=event, user=request.user)

    serializer = EventSerializer(event)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def list_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_event(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
        participant, created = EventParticipant.objects.get_or_create(event=event, user=request.user)
        if created:
            return Response({"message": "Successfully joined the event."}, status=status.HTTP_201_CREATED)
        return Response({"message": "Already joined this event."}, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def leave_event(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
        participant = EventParticipant.objects.get(event=event, user=request.user)
        participant.delete()
        return Response({"message": "Successfully left the event."}, status=status.HTTP_204_NO_CONTENT)
    except (Event.DoesNotExist, EventParticipant.DoesNotExist):
        return Response({"error": "Event or participant not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_event_status(request, event_id):
    try:
        event = Event.objects.get(id=event_id, created_by=request.user) 
    except Event.DoesNotExist:
        return Response({"error": "Event not found or permission denied."}, status=status.HTTP_404_NOT_FOUND)
    
    new_status = request.data.get("status")
    if new_status not in ["pending", "done"]:
        return Response({"error": "Invalid status. Allowed values are 'pending' or 'done'."}, statu=status.HTTP_400_BAD_REQUEST)
    
    event.status = new_status
    event.save()
    serializer = EventSerializer(event)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_events(request):
    user_events = Event.objects.filter(
        Q(created_by=request.user) | Q(participants__user=request.user)
    ).distinct()
    serializer = EventSerializer(user_events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)