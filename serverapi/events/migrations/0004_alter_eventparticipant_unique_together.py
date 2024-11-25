# Generated by Django 5.1.3 on 2024-11-21 18:28

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_event_google_meet_url'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='eventparticipant',
            unique_together={('event', 'user')},
        ),
    ]
