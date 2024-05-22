from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User as AuthUser

class UserSingUpView(CreateView):
	model = AuthUser
	form_class = UserCreationForm
	template_name = 'signup.html'
	success_url = reverse_lazy('login')