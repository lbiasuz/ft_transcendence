from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView

from ft_transcendence.game.serializers import MatchSerializer, TournamentSerializer
from ft_transcendence.game.models import Match

class MatchViewSet(ModelViewSet):
  serializer_class = MatchSerializer
  queryset = Match.objects.all().order_by('id')
  filterset_fields = ['game', 'state', 'kind', 'tournament_uuid']
  search_fields = ['uuid', 'session', 'tournament_uuid', 'next_match']

  def perform_destroy(self, instance: Match):
    instance.state='canceled'
    instance.save()
    if instance.next_match is not None:
      self.perform_destroy(instance.next_match)

class TournamentView(CreateAPIView):
  serializer_class = TournamentSerializer