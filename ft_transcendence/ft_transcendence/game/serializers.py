import uuid
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer

from ft_transcendence.game.models import Match


def validate_scoreboard(value):
    for player in value:
        if player.get("player") is None:
            raise serializers.ValidationError("Player is required")
        if player.get("color") is None:
            raise serializers.ValidationError("Color is required")


class MatchSerializer(ModelSerializer):
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
    game = serializers.CharField(choices=["pong", "pongx"])
    scoreboard = serializers.JSONField(validators=[validate_scoreboard])
    modifiers = serializers.JSONField()

    def create(self, validated_data):
      player_table = validated_data.get("scoreboard")
      tournament_uuid = uuid.uuid4()
      for i in range(0, len(player_table)):
        ...

      ##TODO: MAP EVERY PLAYER TO A GAME WITH AVERY OTHER PLAYER, THEN CREATE MATCHES based on that
      # Match.objects.create(
      #     game=validated_data.get("game"),
      #     kind="tournament",
      #     state="created",
      #     scoreboard=[player1, player2],
      #     modifiers=validated_data.get("modifiers"),
      #     session=self.context["request"].user
      #     next_match=None,
      #     tournament_uuid=tournament_uuid
      # )
      ## THEN UPDATE EVERY OBJECT TO HAVE THE NEXT MATCH ASSOCIATED WITH IT

      # return super(self).create(validated_data)
