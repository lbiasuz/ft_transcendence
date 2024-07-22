from django.dispatch import receiver
from ft_transcendence.core.models import AbstractBaseModel
from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import User
from django.db.models.signals import post_save


class Profile(AbstractBaseModel):
    user = models.OneToOneField(
        "auth.User", on_delete=models.CASCADE, related_name="profile"
    )

    avatar = models.ImageField(verbose_name=_("Avatar"), upload_to="avatars/", null=True, blank=True)

    full_name = models.CharField(verbose_name=_("Nome completo"), max_lenght=100, null=True, blank=True)

    matches = models.IntegerField(default=0)
    matches_won = models.IntegerField(default=0)

    # phone = models.CharField(verbose_name=_("Telefone:"), max_lenght=15, null=True, blank=True)
    # friends = models.ManyToManyField('self', blank=True)
    # friend_requests = models.ManyToManyField('self', blank=True)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


# class Friend(models.Model):
#     status = models.CharField(
#         choices=[
#             ("pending", "Pending"),
#             ("accepted", "Accepted"),
#             ("rejected", "Rejected"),
#         ],
#         default="pending",
#         max_length=10,
#     )
