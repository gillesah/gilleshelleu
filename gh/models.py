from django.db import models
from ckeditor.fields import RichTextField


class Langage(models.Model):
    nom = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nom


class Projet(models.Model):
    titre = models.CharField(max_length=255)
    soustitre = models.CharField(blank=True, null=True, max_length=255)
    image = models.ImageField(upload_to='projets/')
    annee = models.CharField(blank=True, null=True, max_length=255)

    description = RichTextField(blank=True, null=True)

    langages = models.ManyToManyField(Langage)

    # liens = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.titre


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
