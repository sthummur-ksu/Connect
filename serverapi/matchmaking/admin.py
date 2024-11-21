from django.contrib import admin
from .models import MatchHistory

@admin.register(MatchHistory)
class MatchHistoryAdmin(admin.ModelAdmin):
    list_display = ('agent', 'athlete', 'match_date')