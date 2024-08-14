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
    tournament_uuid = serializers.UUIDField(read_only=True)

    def create(self, validated_data):
        match_map = []
        player_table = validated_data.get("scoreboard")
        tournament_uuid = uuid.uuid4()

        if len(player_table) < 3:
            raise serializers.ValidationError("Scoreboard must have at least 3 players")

        for i in range(0, len(player_table)):
            # for each player, setup a match with all other ramaining players

            for j in range(i + 1, len(player_table)):
                # copies the default to not change the original

                match_map.append(
                    Match(
                        **{
                            "game": validated_data.get("game"),
                            "kind": "tournament",
                            "state": "created",
                            "session": self.context["request"].user,
                            "tournament_uuid": tournament_uuid,
                            "modifiers": validated_data.get("modifiers"),
                            "scoreboard": [player_table[i], player_table[j]],
                        }
                    )
                )

        match_list = Match.objects.bulk_create(match_map)
        # shuffles the match_map list, then iterates backwords over it to set the next_match
        random_sample = sample(match_list, len(match_list))
        for i in range(len(random_sample) - 2, -1, -1):
            random_sample[i].next_match = random_sample[i + 1]
            random_sample[i].save()

        return {
            "game": validated_data.get("game"),
            "scoreboard": validated_data.get("scoreboard"),
            "modifiers": validated_data.get("modifiers"),
            "tournament_uuid": tournament_uuid,
        }