## Backend side of the app:

Follow the steps to work with backend

1. Create a virtual environment in your system using command:  # venv is the name of the virtual environment
    `python -m venv venv` or `python3 -m venv venv`
2. Activate created virtual environment:

    `source new_venv/bin/activate`

3. Install dependecies using the requirements.txt file:

    `pip install -r requirements.txt`

4. Create .env file as follows:
    ```
    API_KEY = 'chatGPT key from Stephen
    SECRET_KEY = 'Django key'
    ```

    Generate a Django key from:
    https://www.miniwebtool.com/django-secret-key-generator/

5. Install MySQL driver: this library is not included in requirments.txt due prerequisite steps needed for MacOS (For troubleshooting: https://pypi.org/project/mysqlclient/)

    Windows:

    `pip install mysqlclient`

    MacOC:
    ```
    brew install mysql-client pkg-config
    export PKG_CONFIG_PATH="/opt/homebrew/opt/mysql-client/lib/pkgconfig"
    pip install mysqlclient
    ```

6.  Update .env file with DB access
    ```
    DB_NAME='jobroute'
    DB_USER='from Stephen'
    DB_PASSWORD='from Stephen'
    DB_HOST='pathwaypro-jobroute.cxkq4pb8fxoe.ca-central-1.rds.amazonaws.com'
    DB_PORT='3306'
    ```
7. Update settings.py
In backend/backend/setting.py, change database values.
Change DATABASES settings (Line 91), delete sqlite3 and change aa follows:

    ```
    'ENGINE': 'django.db.backends.mysql',
    'NAME': os.environ.get("DB_NAME"),
    'USER': os.environ.get("DB_USER"),
    'PASSWORD':os.environ.get("DB_PASSWORD"),
    'HOST': os.environ.get("DB_HOST"),
    'PORT': os.environ.get("DB_PORT"),

    ```

8. Migrate data to db:

    `python manage.py makemigrations`

    `python manage.py migrate`

9. Run application from backend directory:

    `python manage.py runserver`