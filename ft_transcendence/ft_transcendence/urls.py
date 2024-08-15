from django.conf import settings
from django.urls import include, path, re_path
from django.conf.urls.static import static

from ft_transcendence.account.views import UserView
from ft_transcendence.core.views import AuthView, HomeView, IntraRedirectView, LogoutView, PingView
from ft_transcendence.game.views import MatchViewSet, TournamentView

urlpatterns = [
	# Prometheus metrics
    path("p/", include("django_prometheus.urls"), name="django-prometheus"),
    # Auth and Session
    path("ping/", PingView.as_view(), name="ping"),
    path("sso/", AuthView.as_view(), name="sso"),
	path('intra/', IntraRedirectView.as_view(), name='intra'),
    # Data and Game
    path("user/", UserView.as_view(), name="user"),
    path(
        "match/", MatchViewSet.as_view({"get": "list", "post": "create"}), name="match"
    ),
    path(
        "match/<int:pk>/",
        MatchViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
        name="match",
    ),
	path('tournament/', TournamentView.as_view(), name='tournament'),
	path('logout/', LogoutView.as_view(), name='logout'),
    re_path(r'(.*)', HomeView.as_view(), name='home'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
