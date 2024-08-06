from datetime import datetime
from random import sample
import uuid
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer

from ft_transcendence.game.models import Match


def validate_scoreboard(value):
    for player in value:
        if player.get("name") is None:
            raise serializers.ValidationError("Player is required")
        if len(player.get("name")) > 16:
            raise serializers.ValidationError("Player name must be less than 16 characters")
        if player.get("color") is None:
            raise serializers.ValidationError("Color is required")


class MatchSerializer(ModelSerializer):

    scoreboard = serializers.JSONField(validators=[validate_scoreboard])
    session = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Match
        fields = [
            "pk",
            "game",
            "state",
            "kind",
            "session",
            "scoreboard",
            "modifiers",
            "started_at",
            "ended_at",
            "next_match",
            "tournament_uuid",
        ]

        def create(self, validated_data):
            validated_data["session"] = self.context["request"].user
            return super(self).create(validated_data)


class TournamentSerializer(Serializer):
    game = serializers.ChoiceField(choices=["pong", "pongx"])
    scoreboard = serializers.JSONField(validators=[validate_scoreboard])
    modifiers = serializers.JSONField()

    def create(self, validated_data):
      match_map = []
      tournament_uuid = uuid.uuid4()
      player_table = validated_data.get("scoreboard")

      default = {
          "game": validated_data.get("game"),
          "kind": "tournament",
          "state": "created",
          "session": self.context["request"].user,
          "tournament_uuid": tournament_uuid,
          "modifiers": validated_data.get("modifiers"),
      }
      
      if len(player_table) < 3:
        raise serializers.ValidationError("Scoreboard must have at least 3 players")

      for i in range(0, len(player_table)):
      # for each player, setup a match with all other ramaining players
  
        player1 = player_table[i].get("name")
        for j in range(i+1, len(player_table)):

          player2 = player_table[j].get("name")

          # copies the default to not change the original  
          match_default = default.copy()
          match_default["scoreboard"] = [player1.copy(), player2]
          
          match_map.append(match_default)

      # shuffles the match_map list, then iterates backwords over it to set the next_match
      random_sample = sample(match_map, len(match_map))
      for i in range(len(random_sample) - 2, -1, -1):
        random_sample[i]["next_match"] = random_sample[i+1]

      Match.objects.bulk_create(random_sample)