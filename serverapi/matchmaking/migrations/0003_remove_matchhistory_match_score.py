# Generated by Django 5.1.2 on 2024-11-13 06:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('matchmaking', '0002_matchhistory_match_score'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='matchhistory',
            name='match_score',
        ),
    ]