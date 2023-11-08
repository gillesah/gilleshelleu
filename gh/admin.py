from django.contrib import admin
from django.utils.html import format_html
from .models import ImageProjet, Projet, Langage, Lien

class LienInline(admin.StackedInline):
    model = Lien
    extra = 1  # Par défaut, affiche un champ vide pour ajouter un nouveau lien

class ImageProjetInline(admin.StackedInline):
    model = ImageProjet
    extra = 1  


@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = ('titre', 'soustitre', 'image_tag', 'description', 'annee')
    list_filter = ('langages',)
    inlines = [LienInline, ImageProjetInline]

    def image_tag(self, obj):
        return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
    image_tag.short_description = 'Image'

@admin.register(Langage)
class LangageAdmin(admin.ModelAdmin):
    pass

