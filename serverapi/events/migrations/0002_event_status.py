# Generated by Django 5.1.2 on 2024-11-13 06:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('done', 'Done')], default='pending', max_length=10),
        ),
    ]
