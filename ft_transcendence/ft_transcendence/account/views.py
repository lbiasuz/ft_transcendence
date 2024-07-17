from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView



class UserView(APIView):
  authentication_classes = [SessionAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request, *args, **kwargs):
    return ("")