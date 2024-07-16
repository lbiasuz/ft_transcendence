
# Create your views here.

from django.views.generic import TemplateView
# import the logging library
import logging

logger = logging.getLogger(__name__)

class HomeView(TemplateView):
    template_name = "index.html"

class AuthView(HomeView):

    def get(self, request, code=None):
        if not code:
            return
# http://localhost:8000/sso_signup?code=97dfd3e14b5041647d28790d98c668de43e9790b2d7a293adc84898890f7b5fa
