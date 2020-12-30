import mysql.connector as conn
from . import models
from hashlib import md5
import jwt
from pyhunter import PyHunter
import clearbit
from decouple import config

clearbit.key = config("CLEARBIT_KEY")

class DbContext:
    @staticmethod
    def register(usr):
        hunter = PyHunter(config("HUNTER_KEY"))
        mail = hunter.email_verifier(usr["email"])["webmail"]
        if mail:
            user = models.User()
            user.first_name = usr["first_name"]
            user.last_name = usr["last_name"]
            user.email = usr["email"]
            user.password = md5(usr["password"].encode()).hexdigest()
            user.save()

    @staticmethod
    def login(usr):
        db = conn.connect(host=config('DB_HOST'),database=config('DB'),user="root",passwd="ko227979")
        cur = db.cursor()
        try:
            cur.execute(f"SELECT * FROM FWWAPP_USER WHERE FWWAPP_USER.email = '{usr['email']}' and FWWAPP_USER.password = '{md5(usr['password'].encode()).hexdigest()}'")
            user = cur.fetchone()
            return jwt.encode({"id": user[0], "first_name": user[1], "last_name": user[2], "email": user[3]}, config('fww'), algorithm="HS256")
        except:
            cur.close()
            db.close()
            return None

    @staticmethod
    def get_recipies(user_id=None):
        db = conn.connect(host=config('DB_HOST'),database=config('DB'),user="root",passwd="ko227979")
        cur = db.cursor()
        try:
            if user_id:
                cur.execute(f"SELECT FWWAPP_RECIPIE.id, FWWAPP_RECIPIE.name, FWWAPP_RECIPIE.text, FWWAPP_USER.first_name, FWWAPP_USER.last_name, FLOOR(AVG(rating)), FWWAPP_USER.email FROM FWWAPP_RECIPIE JOIN FWWAPP_USER ON FWWAPP_RECIPIE.user_id = FWWAPP_USER.id JOIN FWWAPP_RECIPIERATING on FWWAPP_RECIPIERATING.recipie_id = FWWAPP_RECIPIE.id WHERE FWWAPP_RECIPIE.user_id = {user_id} GROUP BY FWWAPP_RECIPIE.id ORDER BY FWWAPP_RECIPIE.id DESC")
                recipies = cur.fetchall()
                cur.close()
                db.close()
                return recipies
            else:
                cur.execute("SELECT FWWAPP_RECIPIE.id, FWWAPP_RECIPIE.user_id, FWWAPP_RECIPIE.name,FWWAPP_USER.first_name, FWWAPP_USER.last_name, FLOOR(AVG(rating)) FROM FWWAPP_RECIPIE JOIN FWWAPP_USER ON FWWAPP_RECIPIE.user_id = FWWAPP_USER.id JOIN FWWAPP_RECIPIERATING on FWWAPP_RECIPIERATING.recipie_id = FWWAPP_RECIPIE.id GROUP BY FWWAPP_RECIPIE.id ORDER BY FWWAPP_RECIPIE.id DESC")
                recipies = cur.fetchall()
                cur.close()
                db.close()
                return recipies

        except:
            cur.close()
            db.close()
            return None
    
    @staticmethod
    def get_recipie(recipie_id):
        db = conn.connect(host=config('DB_HOST'),database=config('DB'),user="root",passwd="ko227979")
        cur = db.cursor()
        try:
            ingredients = []
            cur.execute(f"SELECT FWWAPP_RECIPIE.user_id, FWWAPP_RECIPIE.name, FWWAPP_RECIPIE.text, FWWAPP_USER.first_name, FWWAPP_USER.last_name FROM FWWAPP_RECIPIE INNER JOIN FWWAPP_USER ON FWWAPP_RECIPIE.user_id = FWWAPP_USER.id WHERE FWWAPP_RECIPIE.id = {recipie_id}")
            recipie = cur.fetchone()
            cur.execute(f"SELECT FWWAPP_RECIPIEINGREDIENT.ingredient_name FROM FWWAPP_RECIPIEINGREDIENT WHERE FWWAPP_RECIPIEINGREDIENT.recipie_id = {recipie_id}")
            for ingredient in cur.fetchall():
                ingredients.append(ingredient[0])
            cur.close()
            db.close()
            return {"recipie": recipie, "ingredients": ingredients}
        except:
            cur.close()
            db.close()
            return None

    @staticmethod
    def create_recipie(rec_name, rec_text, rec_user_id):
        user = models.User(pk=rec_user_id)
        try:
            recipie = models.Recipie()
            recipie.name = rec_name
            recipie.text = rec_text
            recipie.user = user
            recipie.save()
            return recipie.id
        except:
            return None
    
    @staticmethod
    def set_initial_rating(recipie_id):
        try:
            rating = models.RecipieRating()
            rating.recipie_id = recipie_id
            rating.user_id = 0
            rating.rating = None
            rating.save()
        except:
            return None
    
    @staticmethod
    def add_recipie_ingredients(ing_array, rec_id):
        for ingr in ing_array:
            try:
                ingredient = models.RecipieIngredient()
                ingredient.ingredient_name = ingr['name']
                ingredient.recipie_id = rec_id
                ingredient.save()
            except:
                return None

    @staticmethod
    def rate_recipie(usr_id, rec_id, rating):
        if usr_id == rec_id:
            return None
        db = conn.connect(host=config('DB_HOST'),database=config('DB'),user="root",passwd="ko227979")
        cur = db.cursor()
        try:
            cur.execute(f"SELECT FWWAPP_RECIPIERATING.id FROM FWWAPP_RECIPIERATING WHERE FWWAPP_RECIPIERATING.user_id = {usr_id} AND FWWAPP_RECIPIERATING.recipie_id = {rec_id}")
            if cur.fetchone():
                return None
            else:
                try:
                    recipie_rating = models.RecipieRating()
                    recipie_rating.user_id = usr_id
                    recipie_rating.recipie_id = rec_id
                    recipie_rating.rating = rating
                    recipie_rating.save()
                    return "Success"
                except:
                    return None
        except:
            return None

    @staticmethod
    def get_aditional_data(mail):
        aditional_data = clearbit.Enrichment.find(email=mail, stream=True)
        links = []
        if aditional_data and "person" in aditional_data and aditional_data["person"]:
            if aditional_data['person']['facebook']['handle']:
                links.append(f"Facebook - @{aditional_data['person']['facebook']['handle']}")
            if aditional_data['person']['github']['handle']:
                links.append(f"GitHub - @{aditional_data['person']['github']['handle']}")
            if aditional_data['person']['twitter']['handle']:
                links.append(f"Twitter - @{aditional_data['person']['twitter']['handle']}")
            if aditional_data['person']['linkedin']['handle']:
                links.append(f"LinkedIn - @{aditional_data['person']['linkedin']['handle']}")
        return links
