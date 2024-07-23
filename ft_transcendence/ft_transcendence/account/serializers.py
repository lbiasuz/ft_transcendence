from rest_framework.serializers import ModelSerializer

from django.contrib.auth.models import User
from ft_transcendence.account.models import Profile

class ProfileSerializer(ModelSerializer):
	class Meta:
		model = Profile
		fields = ['url', 'avatar']

class UserSerializer(ModelSerializer):
	class Meta:
		model = User
		fields = ['username', 'email', 'profile']

	profile = ProfileSerializer(read_only=True)
