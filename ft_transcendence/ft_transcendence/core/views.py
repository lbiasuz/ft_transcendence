
# Create your views here.

from django.views.generic import TemplateView
# import the logging library
import logging

logger = logging.getLogger(__name__)

class HomeView(TemplateView) : 
    template_name = "index.html"
    logger.error('Something went wrong!')