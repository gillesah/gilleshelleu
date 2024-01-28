from django.contrib import admin
from django.utils.html import format_html
from .models import ImageProjet, Projet, Langage, Lien, Certificat, Article

# Les certificats


@admin.register(Certificat)
class CertificatAdmin(admin.ModelAdmin):
    list_display = ('titre', 'formateur', 'annee', 'display_order')
    ordering = ('display_order',)


class LienInline(admin.StackedInline):
    model = Lien
    extra = 1  # Par défaut, affiche un champ vide pour ajouter un nouveau lien


class ImageProjetInline(admin.StackedInline):
    model = ImageProjet
    extra = 1


@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = ('titre', 'soustitre', 'display_order',
                    'description', 'annee')
    list_filter = ('langages',)
    ordering = ('display_order',)
    inlines = [LienInline, ImageProjetInline]

    def image_tag(self, obj):
        return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
    image_tag.short_description = 'Image'


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("titre",  "description_courte",
                    "image", "description", "display_langages")

    def display_langages(self, obj):
        return ", ".join([langage.nom for langage in obj.langage.all()])
    display_langages.short_description = 'Langages'


@admin.register(Langage)
class LangageAdmin(admin.ModelAdmin):
    pass
