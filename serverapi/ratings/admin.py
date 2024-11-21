from django.contrib import admin
from .models import Rating

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('reviewer', 'reviewed_user', 'rating', 'created_at')
    search_fields = ('reviewer__username', 'reviewed_user__username', 'rating')
    list_filter = ('rating', 'created_at')
