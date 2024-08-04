import logging
import requests

from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponseForbidden, HttpResponse
from django.views.generic import TemplateView, RedirectView
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from ft_transcendence.settings import CLIENT_ID, CLIENT_SECRET

logger = logging.getLogger(__name__)

class HomeView(TemplateView):
    template_name = "index.html"


class PingView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return HttpResponse("OK")


class AuthView(TemplateView):
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
        logger.info("iniciando autenticacion")
        request.COOKIES.get('sessionid', None)
        if code := request.GET.get('code', None):
            token_resp = requests.post(
                "https://api.intra.42.fr/oauth/token",
                data={
                    "grant_type": "authorization_code",
                    "client_id": CLIENT_ID,
                    "client_secret": CLIENT_SECRET,
                    "code": code,
                    "redirect_uri": 'http://localhost:8000/sso',
                },
            )
            if token_resp.ok:
                token = token_resp.json().get('access_token', '')
                user_resp = requests.get(
                    "https://api.intra.42.fr/v2/me",
                    headers={"Authorization": f"Bearer {token}"},
                )
                if user_resp.ok:
                    user_data = user_resp.json()
                    user, created = User.objects.get_or_create(username=user_data['login'])
                    if created:
                        user.set_unusable_password()
                        user.email = user_data['email']
                        user.save()

                        if user_data["image"]["link"]:
                            photo_resp = requests.get(user_data["image"]["link"])
                            if photo_resp.ok:
                                user.profile.avatar.save(f"{user_data['login']}.jpg", photo_resp.content)

                        user.profile.url = user_data["url"]

                        # user.profile.full_name = user_data["usual_full_name"]
                        # user.profile.phone = user_data["phone"]

                    user.profile.save()

                    login(request, user)

                    return HttpResponseRedirect(reverse('home'))
                else:
                    logger.error(f"Failed to get user data: {user_resp.content}")
            else:
                logger.error(f"Failed to get token: {token_resp.content}")

        return HttpResponseForbidden("Failed to authenticate")


class IntraRedirectView(RedirectView):
    """
    View for handling intra redirection.

    This view redirects the user to the 42 intra login page.

    Inherits from HomeView.
    """

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(
            f"https://api.intra.42.fr/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={reverse("sso")}&response_type=code"
        )


class LogoutView(APIView):
    """
    View for handling logout.

    This view logs out the user and redirects them to the home page.

    Inherits from HomeView.
    """

    def get(self, request, *args, **kwargs):
        request.COOKIES.get('sessionid', None)
        request.user.auth_token.delete()
        return HttpResponseRedirect(reverse('home'))