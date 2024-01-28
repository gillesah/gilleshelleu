from django.db import models
from ckeditor.fields import RichTextField
from django import forms
from .langage import Langage


class Article(models.Model):
    titre = models.CharField(max_length=255)
    description_courte = models.CharField(
        max_length=350)
    image = models.ImageField(upload_to='articles/', blank=True, null=True,)
    VISIBILITY_TYPE = [("draft", "Draft"), ("public",
                                            "Public"), ("private", "Private")]
    date = models.DateField(blank=True, null=True, max_length=255)
    visibility = models.CharField(
        max_length=30, choices=VISIBILITY_TYPE, default="draft")
    description = RichTextField(blank=True, null=True)

    # liens = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.titre
