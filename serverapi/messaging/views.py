from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Message
from authapp.models import User
from twilio.rest import Client
from django.conf import settings

twilio_client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    sender = request.user
    recipient_id = request.data.get('recipient_id')
    message_content = request.data.get('message')
    attachment = request.data.get('attachment', None)

    try:
        recipient = User.objects.get(id=recipient_id)

        message = Message.objects.create(
            sender=sender,
            recipient=recipient,
            message=message_content,
            attachment=attachment
        )

        if recipient.phone_number:
            twilio_client.messages.create(
                body=message_content,
                from_=settings.TWILIO_PHONE_NUMBER,
                to=recipient.phone_number
            )
            return Response({
                "message": "Message sent successfully",
                "message_id": message.id,
                "recipient": message_content
                }, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Recipient has no phone number"}, status=status.HTTP_400_BAD_REQUEST)
    
    except User.DoesNotExist:
        return Response({"error": "Recipient not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_messages(request):
    messages = Message.objects.filter(recipient=request.user)
    message_list = [{
        "sender": msg.sender.username,
        "message": msg.message,
        "timestamp": msg.timestamp,
        "attachment": msg.attachment
    } for msg in messages]

    return Response(message_list, status=status.HTTP_200_OK)
