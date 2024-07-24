from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from ft_transcendence.account.views import UserView
from ft_transcendence.account.serializers import UserSerializer

class UserViewTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_user_view(self):
        request = self.factory.get(reverse('user'))
        request.user = self.user
        view = UserView.as_view()

        response = view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, UserSerializer(self.user).data)