# Generated by Django 3.0.8 on 2020-12-20 19:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('name', models.CharField(max_length=254, primary_key=True, serialize=False, verbose_name='name')),
            ],
        ),
        migrations.CreateModel(
            name='RecipieIngredient',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='id')),
                ('recipie_id', models.IntegerField(verbose_name='recipie_id')),
                ('ingredient_name', models.CharField(max_length=254, verbose_name='ingredient_name')),
            ],
        ),
        migrations.CreateModel(
            name='RecipieRating',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='id')),
                ('user_id', models.IntegerField(verbose_name='user_id')),
                ('recipie_id', models.IntegerField(verbose_name='recipie_id')),
                ('rating', models.IntegerField(verbose_name='rating')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='id')),
                ('first_name', models.CharField(max_length=254, verbose_name='first_name')),
                ('last_name', models.CharField(max_length=254, verbose_name='last_name')),
                ('email', models.CharField(max_length=254, verbose_name='email')),
                ('password', models.CharField(max_length=254, verbose_name='password')),
            ],
        ),
        migrations.CreateModel(
            name='Recipie',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='id')),
                ('name', models.CharField(max_length=254, verbose_name='name')),
                ('text', models.TextField(verbose_name='text')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='FwwApp.User')),
            ],
        ),
    ]
