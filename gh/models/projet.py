from django.db import models
from ckeditor.fields import RichTextField
from django import forms
from friendly_captcha.fields import FrcCaptchaField
from .langage import Langage


class Projet(models.Model):
    titre = models.CharField(max_length=255)
    soustitre = models.CharField(blank=True, null=True, max_length=255)
    image = models.ImageField(upload_to='projets/')
    annee = models.CharField(blank=True, null=True, max_length=255)
    display_order = models.IntegerField(default=0)

    description = RichTextField(blank=True, null=True)

    langages = models.ManyToManyField(Langage)

    # liens = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.titre
