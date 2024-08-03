"""
URL configuration for ft_transcendence project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static

from ft_transcendence.account.views import UserView
from ft_transcendence.core.views import AuthView, HomeView, PingView
from ft_transcendence.game.views import MatchViewSet

urlpatterns = [
    path("ping/", PingView.as_view(), name="ping"),
    path("admin/", admin.site.urls),
    path("sso/", AuthView.as_view(), name="sso"),
    path("user/", UserView.as_view(), name="user"),
    path(
        "match/", MatchViewSet.as_view({"get": "list", "post": "create"}), name="match"
    ),
    path(
        "match/<int:pk>",
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
    path("p/", include("django_prometheus.urls"), name="django-prometheus"),
    path("", HomeView.as_view(), {'resource': ''}, name="home"),
    path('<path:resource>', HomeView.as_view())
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
