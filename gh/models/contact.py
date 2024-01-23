from django.db import models
from ckeditor.fields import RichTextField
from django import forms
from friendly_captcha.fields import FrcCaptchaField


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']
    captcha = FrcCaptchaField()
