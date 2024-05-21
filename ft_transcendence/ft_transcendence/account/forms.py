from django.forms import ModelForm

from ft_transcendence.account.models import UserProfile

class UserProfileForm(ModelForm):
	class Meta:
		model = UserProfile
