from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User as AuthUser
from django.contrib import messages

class UserSingUpView(CreateView):
	model = AuthUser
	form_class = UserCreationForm
	template_name = 'templates/signup.html'
	success_url = reverse_lazy('login')

	def form_valid(self, form):
		response = super().form_valid(form)
		messages.success(self.request, 'Your account has been created! You are now able to log in')
		return response

	def form_invalid(self, form):
		response = super().form_invalid(form)
		messages.error(self.request, 'An error occurred during registration')
		return response
