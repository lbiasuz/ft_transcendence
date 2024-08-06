from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from ft_transcendence.account.serializers import UserSerializer

class UserView(APIView):
  authentication_classes = [SessionAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request, *args, **kwargs):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
