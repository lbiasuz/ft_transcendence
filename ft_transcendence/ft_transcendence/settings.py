"""
Django settings for ft_transcendence project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
from pathlib import Path
from decouple import config, Csv

from ft_transcendence.logger import CustomisedJSONFormatter

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY", default="")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=False, cast=bool)

ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="[]", cast=Csv())

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

STATICFILES_DIRS = [
    ("static", os.path.join(BASE_DIR, "ft_transcendence", "static")),
]

STATIC_ROOT = config("STATIC_ROOT", default=os.path.join(BASE_DIR, "static"))

MEDIA_URL = config("MEDIA_URL", default="media/")

DEFAULT_FILE_STORAGE = config(
    "DEFAULT_FILE_STORAGE", default="django.core.files.storage.FileSystemStorage"
)

if DEFAULT_FILE_STORAGE == "django.core.files.storage.FileSystemStorage":
    MEDIA_ROOT = config("MEDIA_ROOT", default=os.path.join(BASE_DIR, "media"))

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "django_filters",
    "django_prometheus",
    "elasticapm.contrib.django",
    "ft_transcendence.account",
    "ft_transcendence.game",
    "ft_transcendence.core",
]

ELASTIC_APM = {
    "SERVICE_NAME": "transcendence",
    "SERVER_URL": "http://apm-server:8200",
    "ENVIRONMENT": "container",
    "DEBUG": False,
}


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "simple": {
            "format": "[%(asctime)s] %(levelname)s|%(name)s|%(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
        "json": {
            "()": CustomisedJSONFormatter,
        },
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s"
        },
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django.db.backends": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
    },
}

if DEBUG != "True":
    LOGGING["handlers"].update(
        {
            "applogfile": {
                "level": "DEBUG",
                "class": "logging.handlers.RotatingFileHandler",
                "filename": Path(BASE_DIR).resolve().joinpath("logs", "app.log"),
                "maxBytes": 1024 * 1024 * 15,  # 15MB
                "backupCount": 10,
                "formatter": "json",
            },
            "elasticapm": {
                "level": "WARNING",
                "class": "elasticapm.contrib.django.handlers.LoggingHandler",
            },
        }
    )
    LOGGING["loggers"].update(
        {
            "ft_transcendence": {
                "level": "WARNING",
                "handlers": ["elasticapm", "applogfile"],
                "propagate": False,
            },
            "elasticapm.errors": {
                "level": "ERROR",
                "handlers": ["console"],
                "propagate": False,
            },
        }
    )
    LOGGING.update(
        {
            "root": {
                "handlers": ["applogfile"],
                "level": "DEBUG",
            }
        }
    )


MIDDLEWARE = [
    "django_prometheus.middleware.PrometheusBeforeMiddleware",
    "elasticapm.contrib.django.middleware.TracingMiddleware",
    "elasticapm.contrib.django.middleware.Catch404Middleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

AUTHENTICATION_BACKENDS = ["django.contrib.auth.backends.ModelBackend"]
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_COOKIE_AGE = 5 * 60

ROOT_URLCONF = "ft_transcendence.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "elasticapm.contrib.django.context_processors.rum_tracing",
            ],
        },
    },
]

# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("POSTGRES_DB"),
        "USER": config("POSTGRES_USER"),
        "PASSWORD": config("POSTGRES_PASSWORD"),
        "HOST": "localhost" if DEBUG else "db",
        "PORT": "5432",
    }
}


# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

REST_FRAMEWORK = {
    "DATETIME_FORMAT": "%Y-%m-%dT%H:%M:%S.%fZ",
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
}

CLIENT_ID = config("INTRA_CLIENT_ID", default="")
CLIENT_SECRET = config("INTRA_CLIENT_SECRET", default="")
