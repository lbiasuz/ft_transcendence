# Generated by Django 4.2.14 on 2024-08-03 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0002_match_tournament_uuid_alter_match_modifiers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='game',
            field=models.CharField(choices=[('pong', 'Pong'), ('pongx', 'Pong X')], max_length=10, verbose_name='Game'),
        ),
        migrations.AlterField(
            model_name='match',
            name='modifiers',
            field=models.JSONField(blank=True, default=dict, null=True, verbose_name='Modifiers'),
        ),
        migrations.AlterField(
            model_name='match',
            name='scoreboard',
            field=models.JSONField(blank=True, default=dict, null=True, verbose_name='Scoreboard'),
        ),
    ]
