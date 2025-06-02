from pathlib import Path
from dotenv import load_dotenv

from .utils.mongo import connectToMongo
from .services.cloudinary import config_cloudinary

import os
import dj_database_url

load_dotenv()
config_cloudinary()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ut*#isk0k#=p8!$3!lru=38as0^)$^p57vixb!$7d8dn)*2-jg'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["*"]

# Application definition

DEFAULT_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles'
]

THIRD_PART_APPS = [
    'rest_framework',
    'rest_authtoken',
    'rest_framework.authtoken',
    'rest_framework_mongoengine',
    'corsheaders',
    'rolepermissions',
]

PROJECT_APPS = [
    'courses',
    'recipes',
    'users',
    'payments',
    'survey'
]

INSTALLED_APPS = DEFAULT_APPS + THIRD_PART_APPS + PROJECT_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware'
]

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": dj_database_url.config(default=os.getenv("POSTGRES_DB_HOST"), conn_max_age=600)
}



MONGODB_DATABASES = {
    "default": {
        "name": os.environ.get("MONGO_DB_NAME"),
        "host": os.environ.get("MONGO_DB_HOST"),
        "tz_aware": True, # if you using timezones in django (USE_TZ = True)
    },
}

try:
    connectToMongo(
        host=os.environ.get("MONGO_DB_HOST")
    )
except Exception as err:
    print(f"ERROR con la conexion a mongodb: {err}")


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS_ORIGIN_WHITELIST = [
#     os.environ.get("FRONTEND_URL")
# ]

CORS_ALLOW_ALL_ORIGINS = True  # Permitir cualquier frontend

REST_FRAMEWORK = {
   'DEFAULT_AUTHENTICATION_CLASSES': (
       'rest_framework.authentication.TokenAuthentication',
   ),
   'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAdminUser'
   )
}

ROLEPERMISSIONS_MODULE = 'api.roles'

APPEND_SLASH = False