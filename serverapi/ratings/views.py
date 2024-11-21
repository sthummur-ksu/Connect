from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Rating
from .serializers import RatingSerializer
from authapp.models import User

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_rating(request):
    reviewer = request.user
    reviewed_user_id = request.data.get('reviewed_user_id')
    rating = request.data.get('rating')
    review = request.data.get('review', '')

    try:
        reviewed_user = User.objects.get(id=reviewed_user_id)
        rating_obj, created = Rating.objects.get_or_create(
            reviewer=reviewer,
            reviewed_user=reviewed_user,
            defaults={'rating': rating, 'review': review}
        )

        if not created:
            return Response({"error": "You have already rated this user."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = RatingSerializer(rating_obj)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def list_ratings(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        ratings = Rating.objects.filter(reviewed_user=user)
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
