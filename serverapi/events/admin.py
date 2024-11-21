from django.contrib import admin
from .models import Event, EventParticipant

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_date', 'location', 'created_by', 'created_at')
    search_fields = ('title', 'location', 'created_by__username')
    list_filter = ('event_date', 'created_at')

@admin.register(EventParticipant)
class EventParticipantAdmin(admin.ModelAdmin):
    list_display = ('event', 'user')
    search_fields = ('event__title', 'user__username')
    list_filter = ('event',)