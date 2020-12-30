To run the app first download the files localy,
set your database (MySQL) connection data in the settings.ini file,

navigate to the api direcory,

then in the command line run:
pip install -r requirements.txt,

when that finishes you need to migrate the tables to the database so run:
python manage.py makemigrations and python manage.py migrate,

after all is done run:
python manage.py runserver.

For the client side navigate to the frontend directory and from the terminal run:
npm install,

and when its done run:
npm start. 

The tab should automatically open in the browser if it doesn't navigate to localhost:3000.

The backend is made in Django with a MySQL database and React on the frontend.
