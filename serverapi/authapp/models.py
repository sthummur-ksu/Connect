from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    USER_ROLES = [
        ('athlete', 'Athlete'),
        ('agent', 'Agent'),
        ('admin', 'Admin'),
    ]
    
    VERIFICATION_STATUSES = [
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    ]
    
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True, blank=True, null=True)
    role = models.CharField(max_length=20, choices=USER_ROLES)
    location = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUSES, default='pending')

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',
        blank=True,
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',
        blank=True,
        verbose_name='user permissions',
    )

class AthleteProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    height = models.CharField(max_length=10, blank=True, null=True)
    weight = models.CharField(max_length=10, blank=True, null=True)
    sport = models.CharField(max_length=50, blank=True, null=True)
    team = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.sport}"

class AgentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sport = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.sport}"