from django.db import models

from ft_transcendence.core.models import AbstractBaseModel


# Create your models here.
class Match(AbstractBaseModel):
	game = models.CharField(
		verbose_name="Game",
		choices=[("pong", "Pong"), ("brick", "Brick")], 
		max_length=10
	)
	state = models.CharField(
		verbose_name="State",
		choices=[
			("created", "Created"),
			("ongoing", "On-going"),
			("ended", "Ended"),
			("canceled", "Canceled"),
		],
		max_length=10,
	)
	kind = models.CharField(
		verbose_name="Kind",
		choices=[("single", "Single"), ("rematch", "Rematch"), ("tournament", "Tournament")],
		max_length=10,
	)
	session = models.ForeignKey(
		"auth.User",
		verbose_name="session",
		on_delete=models.CASCADE,
		related_name="matches"
	)
	scoreboard = models.JSONField(
		verbose_name="Scoreboard",
		default=dict
	)
	modifiers = models.JSONField(
		verbose_name="Modifiers",
		default=dict
	)
	started_at = models.DateTimeField(
		verbose_name="Started at",
		null=True,
		blank=True
	)
	ended_at = models.DateTimeField(
		verbose_name="Ended at",
		null=True,
		blank=True
	)
	next_match = models.ForeignKey(
		"self",
		verbose_name="Next match",
		on_delete=models.SET_NULL,
		null=True,
		blank=True
	)