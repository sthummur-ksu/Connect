from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import AthleticAchievement, VideoHighlight
from authapp.models import User

@api_view(['GET', 'POST'])
def athletic_achievement_view(request, user_id=None):
    if request.method == 'GET':
        if user_id:
            achievements = AthleticAchievement.objects.filter(user__id=user_id)
        else:
            achievements = AthleticAchievement.objects.all()

        achievement_list = [{"user": achievement.user.username, "achievement": achievement.achievement, "created_at": achievement.created_at} for achievement in achievements]
        return Response(achievement_list)

    elif request.method == 'POST':
        if request.user.is_authenticated:
            achievement = request.data.get('achievement')
            AthleticAchievement.objects.create(user=request.user, achievement=achievement)
            return Response({"message": "Achievement added successfully"}, status=status.HTTP_201_CREATED)
        return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'POST'])
def video_highlight_view(request, user_id=None):
    if request.method == 'GET':
        if user_id:
            videos = VideoHighlight.objects.filter(user__id=user_id)
        else:
            videos = VideoHighlight.objects.all()

        video_list = [{"user": video.user.username, "video_url": video.video_url, "uploaded_at": video.uploaded_at} for video in videos]
        return Response(video_list)

    elif request.method == 'POST':
        if request.user.is_authenticated:
            video_url = request.data.get('video_url')
            VideoHighlight.objects.create(user=request.user, video_url=video_url)
            return Response({"message": "Video uploaded successfully"}, status=status.HTTP_201_CREATED)
        return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
