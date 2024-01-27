from django.shortcuts import render, get_object_or_404
from django.utils.html import mark_safe, escape
from .models import Langage, Projet, ContactForm, Certificat, Article
from django.core.serializers import serialize
from django.core.mail import send_mail
from django.conf import settings
from decouple import config, Csv


def home(request):
    # Récupère tous les projets pour les afficher dans la page d'accueil.
    projets = Projet.objects.all()
    langage_filter = request.GET.get('langage')
    if langage_filter:
        projets = Projet.objects.filter(langages__nom=langage_filter)
    else:
        projets = Projet.objects.all().order_by('display_order')

    for projet in projets:
        liens = serialize('json', projet.liens.all())
        projet.liens_json = liens
        projet.description = mark_safe(projet.description)
    langages = Langage.objects.all()

    return render(request, 'home.html', {'projets': projets, 'langages': langages})


def liste_projets(request):
    langage_filter = request.GET.get('langage')
    if langage_filter:
        projets = Projet.objects.filter(langages__nom=langage_filter)
    else:
        projets = Projet.objects.all().order_by('display_order')
    for projet in projets:
        liens = serialize('json', projet.liens.all())
        projet.liens_json = liens
        projet.description = mark_safe(projet.description)
    # pour boucler avec le filtre
    langages = Langage.objects.all()

    return render(request, 'liste_projets.html', {'projets': projets, 'langages': langages})


def list_articles(request):
    articles = Article.objects.all().order_by("date")
    return render(request, "blog.html", {"articles": articles})


def post_single(request, id):
    article = get_object_or_404(Article, pk=id)
    return render(request, "post_single.html", {"article": article})


def experience(request):
    return render(request, 'experience.html')


def education(request):
    certificats = Certificat.objects.all().order_by("display_order")

    return render(request, 'education.html', {"certificats": certificats})

# Formulaire de contact


def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact = form.save()
            subject = f"Message de {form.cleaned_data['name']}"
            message = form.cleaned_data['message']
            from_email = form.cleaned_data['email']

            # Envoyer un email
            send_mail(
                subject,
                message,
                from_email,
                [config('EMAIL_HOST_USER')],
                fail_silently=False,
            )
            return render(request, 'contact_success.html')
    else:
        form = ContactForm()

    return render(request, 'contact.html', {'form': form})
