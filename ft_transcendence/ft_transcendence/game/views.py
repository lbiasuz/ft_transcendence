from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from ft_transcendence.game.serializers import MatchSerializer
from ft_transcendence.game.models import Match

class MatchViewSet(ModelViewSet):
  serializer_class = MatchSerializer
  queryset = Match.objects.all()
  filter_backends = (DjangoFilterBackend,)
  
  def perform_destroy(self, instance: Match):
    instance.state='canceled'
    instance.save()
    if instance.next_match is not None:
      self.perform_destroy(instance.next_match)
