# achievements admin.py

from django.contrib import admin
from .models import AthleticAchievement, VideoHighlight

@admin.register(AthleticAchievement)
class AthleticAchievementAdmin(admin.ModelAdmin):
    list_display = ('user', 'achievement', 'created_at')
    search_fields = ('user__username', 'achievement') 

@admin.register(VideoHighlight)
class VideoHighlightAdmin(admin.ModelAdmin):
    list_display = ('user', 'video_url', 'uploaded_at') 
    search_fields = ('user__username', 'video_url') 
