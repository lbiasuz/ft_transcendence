import requests

from django.http import HttpRequest
# from django.urls import reverse
from rest_framework.authentication import BaseAuthentication
from ft_transcendence.settings import CLIENT_ID, CLIENT_SECRET

class Intra42Authentication(BaseAuthentication):
    def authenticate(self, request: HttpRequest):
        if code := request.GET.get('code', None):
            token_resp = requests.post(
                "https://api.intra.42.fr/oauth/token",
                data={
                    "grant_type": "authorization_code",
                    "client_id": CLIENT_ID,
                    "client_secret": CLIENT_SECRET,
                    "code":code,
                    "redirect_uri": 'https://localhost:8000/sso',
                },
            )
            if not token_resp.ok:
                return None
            #TODO: PAREI AQUI: BUSCAR USUÁRIO E AUTENTICAR
        return None


    def authenticate_header(self, _) -> None:
        return None