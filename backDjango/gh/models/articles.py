from django.db import models
from ckeditor.fields import RichTextField
from django import forms
from .langage import Langage
from django.template.defaultfilters import slugify
from django.utils.crypto import get_random_string


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
    langage = models.ManyToManyField(
        Langage, verbose_name="Langages", blank=True)
    # liens = models.JSONField(blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.titre or Article.objects.filter(titre=self.titre).exclude(pk=self.pk).exists():
            # Si le titre est vide ou en double, générer un slug aléatoire
            self.slug = get_random_string(8)
        else:
            self.slug = slugify(self.titre)

        super(Article, self).save(*args, **kwargs)

    def __str__(self):
        return self.titre
