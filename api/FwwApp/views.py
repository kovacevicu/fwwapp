from django.shortcuts import render
from django.shortcuts import render, HttpResponse
from .dbContext import DbContext
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseBadRequest, HttpResponseNotFound

# Create your views here.
@csrf_exempt
def recipies(request, user_id=None):
    if request.method == "GET":
        if user_id is not None:
            recipies = DbContext.get_recipies(user_id)
            if recipies:
                mail = recipies[0][6]
                links = DbContext.get_aditional_data(mail)
                return HttpResponse(json.dumps({"recipes": recipies, "links": links if links else None}))
            else:
                return HttpResponse("No recipes were found...")
        else:
            recipies = DbContext.get_recipies()
            return HttpResponse(json.dumps(recipies))

    if request.method == "POST":
        recipie = json.loads(request.body.decode())
        recipie_id = DbContext.create_recipie(recipie["name"], recipie["text"], recipie["user_id"])
        DbContext.add_recipie_ingredients(recipie["ingredients"], recipie_id)
        DbContext.set_initial_rating(recipie_id)
        return HttpResponse(json.dumps(recipie))


def recipie(request, recipie_id):
    recipie = DbContext.get_recipie(recipie_id)
    if recipie:
        return HttpResponse(json.dumps(recipie))
    else:
        return HttpResponseNotFound("Recipe not found...")


@csrf_exempt
def register(request):
    if request.method == "POST":
        user = json.loads(request.body.decode())
        DbContext.register(user)
        return HttpResponse(user)


@csrf_exempt
def login(request):
    if request.method == "POST":
        user = DbContext.login(json.loads(request.body.decode()))
        if user:
            return HttpResponse(user)
        else:
            return HttpResponseBadRequest("Invalid user...")

@csrf_exempt
def rate(request):
    if request.method == "POST":
        rating = json.loads(request.body.decode())
        DbContext.rate_recipie(rating["user_id"], rating["recipie_id"], rating["rating"])
        return HttpResponse(rating["rating"])



