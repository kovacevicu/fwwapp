from django.db import models

# Create your models here.
class User(models.Model):
    id = models.AutoField("id", primary_key=True)
    first_name = models.CharField("first_name", max_length=254)
    last_name = models.CharField("last_name", max_length=254)
    email = models.CharField("email", max_length=254)
    password = models.CharField("password", max_length=254)

class Recipie(models.Model):
    id = models.AutoField("id", primary_key=True)
    name = models.CharField("name", max_length=254)
    text = models.TextField("text")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class RecipieIngredient(models.Model):
    id = models.AutoField("id", primary_key=True)
    recipie_id = models.IntegerField("recipie_id")
    ingredient_name = models.CharField("ingredient_name", max_length=254)

class RecipieRating(models.Model):
    id = models.AutoField("id", primary_key=True)
    user_id = models.IntegerField("user_id")
    recipie_id = models.IntegerField("recipie_id")
    rating = models.IntegerField("rating", null=True)