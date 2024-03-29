# Generated by Django 4.2.7 on 2024-01-27 14:16

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gh', '0011_certificat'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=255)),
                ('description_courte', models.CharField(blank=True, max_length=350, null=True)),
                ('image', models.ImageField(upload_to='articles/')),
                ('date', models.DateField(blank=True, max_length=255, null=True)),
                ('description', ckeditor.fields.RichTextField(blank=True, null=True)),
            ],
        ),
    ]
