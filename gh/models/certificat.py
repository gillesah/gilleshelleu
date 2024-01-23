from django.db import models
from ckeditor.fields import RichTextField
from django import forms


class Certificat(models.Model):
    titre = models.CharField(max_length=255)
    formateur = models.CharField(blank=True, null=True, max_length=255)
    annee = models.CharField(blank=True, null=True, max_length=255)
    display_order = models.IntegerField(default=0)

    def __str__(self):
        return self.titre
