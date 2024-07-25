import random

from uuid import uuid4

from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django import dispatch
from django_prometheus.models import ExportModelOperationsMixin

class QuerySet(models.query.QuerySet):
    def delete(self):
        self.update(deleted_at=timezone.now())
        [
            post_soft_delete.send(sender=type(obj), instance=obj, using=obj._state.db)
            for obj in self
        ]

class Manager(models.Manager):
    def get_queryset(self):
        return QuerySet(self.model, using=self._db).filter(deleted_at__isnull=True)

    def random(self):
        count = self.count() - 1
        return self.all()[random.randint(0, count)]

class AbstractBaseModel(ExportModelOperationsMixin("dataset"), models.Model):
    uuid = models.UUIDField(
        verbose_name='uuid', default=uuid4, editable=False, unique=True
    )
    created_at = models.DateTimeField(verbose_name=_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_('updated at'), auto_now=True)
    deleted_at = models.DateTimeField(
        verbose_name=_('deleted at'), null=True, blank=True
    )
    objects = Manager()
    objects_all = models.Manager()

    def delete(self):
        self.deleted_at = timezone.now()
        self.save()
        post_soft_delete.send(sender=type(self), instance=self, using=self._state.db)

    class Meta:
        abstract = True

    def __str__(self):
        return str(self.pk)

post_soft_delete = dispatch.Signal(['instance', 'using'])

