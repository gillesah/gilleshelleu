from django.db import models
from ckeditor.fields import RichTextField
from django import forms
from friendly_captcha.fields import FrcCaptchaField
from .projet import Projet


# des liens pour les projets


class Lien(models.Model):
    projet = models.ForeignKey(
        Projet, on_delete=models.CASCADE, related_name="liens")
    intitule = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.intitule

# images pour faire un carousel


class ImageProjet(models.Model):
    projet = models.ForeignKey(
        Projet, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='projets/images/')

    def __str__(self):
        return f"Image for {self.projet.titre}"
