from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView

from ft_transcendence.game.serializers import MatchSerializer, TournamentSerializer
from ft_transcendence.game.models import Match

class MatchViewSet(ModelViewSet):
  serializer_class = MatchSerializer
  queryset = Match.objects.all()
  filterset_fields = ['game', 'state', 'kind', 'tournament_uuid']
  search_fields = ['uuid', 'session', 'tournament_uuid', 'next_match']

  def get_queryset(self):
    return super().get_queryset().filter(session=self.request.user)
  
  def perform_destroy(self, instance: Match):
    if instance.tournament_uuid is not None:
      Match.objects.filter(tournament_uuid = instance.tournament_uuid).update(state='canceled')
    else:
      instance.state = "canceled"
      instance.save()


class TournamentView(CreateAPIView):
  serializer_class = TournamentSerializer