from django.urls import path
from .views import athletic_achievement_view, video_highlight_view

urlpatterns = [
    path('achievements/', athletic_achievement_view, name='athletic_achievement'),
    path('achievements/<int:user_id>/', athletic_achievement_view, name='athletic_achievement_by_user'),

    path('highlights/', video_highlight_view, name='video_highlight'),
    path('highlights/<int:user_id>/', video_highlight_view, name='video_highlight_by_user'),
]
