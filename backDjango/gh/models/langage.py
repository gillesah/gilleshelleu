from django.db import models
from django import forms


class Langage(models.Model):
    nom = models.CharField(max_length=50, unique=True, blank=True, null=True,)

    def __str__(self):
        return self.nom
