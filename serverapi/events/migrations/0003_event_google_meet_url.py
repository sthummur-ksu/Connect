# Generated by Django 5.1.2 on 2024-11-21 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='google_meet_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]