# Generated by Django 5.1.2 on 2024-10-28 15:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MatchHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('match_date', models.DateTimeField(auto_now_add=True)),
                ('agent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='agent_matches', to=settings.AUTH_USER_MODEL)),
                ('athlete', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='athlete_matches', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]