# Generated by Django 4.2.7 on 2023-11-11 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gh', '0009_contact'),
    ]

    operations = [
        migrations.AddField(
            model_name='projet',
            name='display_order',
            field=models.IntegerField(default=0),
        ),
    ]
