from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, AthleteProfile, AgentProfile

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    phone_number = request.data.get('phone_number')
    role = request.data.get('role')

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    
    if phone_number and User.objects.filter(phone_number=phone_number).exists():
        return Response({'error': 'Phone number already exists'}, status=400)

    user = User.objects.create(
        username=username,
        email=email,
        phone_number=phone_number,
        password=make_password(password),
        role=role
    )

    if role == 'athlete':
        AthleteProfile.objects.create(user=user)
    elif role == 'agent':
        AgentProfile.objects.create(user=user)

    return Response({'message': 'User created successfully'}, status=201)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, email=email, password=password)
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': user.role
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error:' 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    if request.method == 'GET':
        profile_data = {
            'username': user.username,
            'email': user.email,
            'phone_number': user.phone_number,
            'role': user.role,
            'location': user.location,
            'bio': user.bio,
            'verification_status': user.verification_status,
        }
        if user.role == 'athlete':
            profile = AthleteProfile.objects.get(user=user)
            profile_data.update({
                'height': profile.height,
                'weight': profile.weight,
                'sport': profile.sport,
                'team': profile.team,
            })
        elif user.role == 'agent':
            profile = AgentProfile.objects.get(user=user)
            profile_data.update({
                'sport': profile.sport,
            })
        return Response(profile_data)
    
    elif request.method == 'PUT':
        data = request.data
        user.location = data.get('location', user.location)
        user.bio = data.get('bio', user.bio)
        user.phone_number = data.get('phone_number', user.phone_number)
        if user.role == 'athlete':
            profile = AthleteProfile.objects.get(user=user)
            profile.height = data.get('height', profile.height)
            profile.weight = data.get('weight', profile.weight)
            profile.sport = data.get('sport', profile.sport)
            profile.team = data.get('team', profile.team)
            profile.save()
        elif user.role == 'agent':
            profile = AgentProfile.objects.get(user=user)
            profile.sport = data.get('sport', profile.sport)
            profile.save()
        user.save()
        return Response({'message': 'Profile updated successfully'}, status=200)
