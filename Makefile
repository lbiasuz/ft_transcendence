# Description: Makefile for Django project
include .env

DOCKER_CMD = docker-compose

ifeq ($(DEBUG), True)
	COMPOSE_FILE = tools/docker-compose-dev.yml
else
	COMPOSE_FILE = tools/docker-compose.yml
endif

all: setup up

setup:
	pip install poetry

shell:
	poetry shell

dependencies:
	poetry install

ruff:
	poetry run ruff check .

ruff-fix:
	poetry run ruff check --fix .

runserver:
	poetry run python ft_transcendence/manage.py runserver

migrations:
	poetry run python ft_transcendence/manage.py makemigrations

migrate:
	poetry run python ft_transcendence/manage.py migrate

coverage:
	poetry run coverage run --source='.' ft_transcendence/manage.py test ft_transcendence
	poetry run coverage report

coverage-html:
	poetry run coverage run --source='.' ft_transcendence/manage.py test ft_transcendence
	poetry run coverage html

build:
	$(DOCKER_CMD) --env-file ./.env -f $(COMPOSE_FILE) build

up:
	$(DOCKER_CMD) --env-file ./.env -f $(COMPOSE_FILE) build
	$(DOCKER_CMD) --env-file ./.env -f $(COMPOSE_FILE) up -d

down:
	$(DOCKER_CMD) --env-file ./.env -f $(COMPOSE_FILE) down

rmi:
	$(DOCKER_CMD) --env-file ./.env -f $(COMPOSE_FILE) down --rmi all -v

restart: down up
