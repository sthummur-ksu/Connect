from rest_framework import serializers
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    reviewer = serializers.ReadOnlyField(source='reviewer.username')
    reviewed_user = serializers.ReadOnlyField(source='reviewed_user.username')

    class Meta:
        model = Rating
        fields = ['id', 'reviewer', 'reviewed_user', 'rating', 'review', 'created_at']
