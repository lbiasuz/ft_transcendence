from rest_framework.serializers import ModelSerializer

from ft_transcendence.game.models import Match

class MatchSerializer(ModelSerializer):
  class Meta:
    model = Match
    fields = [
      'pk',
      'game',
      'state',
      'kind',
      'scoreboard',
      'modifiers',
      'started_at',
      'ended_at',
      'next_match',
      'tournament_uuid'
    ]

class CreateMatchSerializer(ModelSerializer):
  class Meta:
    model = Match
    fields = ['game', 'kind', 'scoreboard', 'modifiers', 'next_match']