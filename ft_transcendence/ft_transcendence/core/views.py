import logging
import requests

from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponseBadRequest
from django.views.generic import TemplateView
from django.contrib.auth import login
from django.contrib.auth.models import User

from ft_transcendence.settings import CLIENT_ID, CLIENT_SECRET

logger = logging.getLogger(__name__)

class HomeView(TemplateView):
    template_name = "index.html"

class AuthView(HomeView):
    """
    View for handling authentication.

    This view handles the authentication process by exchanging the authorization code
    for an access token and retrieving user data from the 42 API. If the user is
    successfully authenticated, it creates a new user object or retrieves an existing
    one based on the user's login. Finally, it redirects the user to the home page.

    If the authentication process fails, an error message is logged and a bad request
    response is returned.

    Inherits from HomeView.
    """

    def get(self, request, *args, **kwargs):
        if code := request.GET.get('code', None):
            token_resp = requests.post(
                "https://api.intra.42.fr/oauth/token",
                data={
                    "grant_type": "authorization_code",
                    "client_id": CLIENT_ID,
                    "client_secret": CLIENT_SECRET,
                    "code":code,
                    "redirect_uri": 'http://localhost:8000/sso',
                },
            )
            if token_resp.ok:
                token = token_resp.json().get('access_token', '')
                user_resp = requests.get(
                    "https://api.intra.42.fr/v2/me",
                    headers={"Authorization": f"Bearer {token}"},
                )
                if user_resp.status_code == 200:
                    user_data = user_resp.json()
                    user, created = User.objects.get_or_create(username=user_data['login'])
                    if created:
                        user.set_unusable_password()
                        user.save()

                        user.profile.avatar = user_data["image"]["link"]
                        user.profile.full_name = user_data["usual_full_name"]
                        user.profile.save()

                    # user.profile.phone = user_data["phone"]

                    login(request, user)

                    return HttpResponseRedirect(reverse('home'))
                else:
                    logger.error(f"Failed to get user data: {user_resp.content}")
            else:
                logger.error(f"Failed to get token: {token_resp.content}")

        return HttpResponseBadRequest("Failed to authenticate")