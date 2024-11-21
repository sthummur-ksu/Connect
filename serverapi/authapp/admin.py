from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, AthleteProfile, AgentProfile

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'verification_status', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'phone_number')
    list_filter = ('role', 'verification_status', 'is_staff', 'is_superuser')

    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('verification_status',)}),
    )

@admin.register(AthleteProfile)
class AthleteProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'height', 'weight', 'sport', 'team')
    search_fields = ('user__username', 'team')

@admin.register(AgentProfile)
class AgentProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'sport')
    search_fields = ('user__username', 'sport')

