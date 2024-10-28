# Generated by Django 4.2.7 on 2024-01-28 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gh', '0014_article_visibility'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='visibility',
            field=models.CharField(choices=[('draft', 'Draft'), ('public', 'Public'), ('private', 'Private')], default='draft', max_length=30),
        ),
    ]