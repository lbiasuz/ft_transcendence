from django.test import TestCase, RequestFactory
from django.urls import reverse
from django.contrib.auth.models import User
from unittest.mock import MagicMock, patch
from ft_transcendence.core.views import AuthView


def create_mock_response(status_code, json_data):
    response_mock = MagicMock()
    response_mock.status_code = status_code
    response_mock.json = MagicMock(return_value=json_data)
    return response_mock


class AuthViewTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    @patch(
        "requests.post",
        return_value=create_mock_response(200, {"access_token": "mock_token"}),
    )
    @patch(
        "requests.get", return_value=create_mock_response(200, {"login": "mock_user"})
    )
    @patch("ft_transcendence.core.views.login", return_value=None)
    def test_auth_view_success(self, post_mock, get_mock, login_mock):
        request = self.factory.get(reverse("sso") + "?code=mock_code")
        response = AuthView.as_view()(request)

        self.assertTrue(User.objects.filter(username="mock_user").exists())
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse("home"))
        self.assertEqual(post_mock.call_count, 1)
        self.assertEqual(get_mock.call_count, 1)
        self.assertEqual(login_mock.call_count, 1)

    @patch(
        "requests.post", return_value=create_mock_response(400, {"error": "mock_error"})
    )
    def test_auth_view_failure(self, post_mock):
        request = self.factory.get(reverse("sso") + "?code=mock_code")
        response = AuthView.as_view()(request)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.content.decode(), "Failed to authenticate")
        self.assertEqual(post_mock.call_count, 1)
