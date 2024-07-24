# Description: Makefile for Django project

DOCKER_CMD = docker compose
COMPOSE_FILE = .devcontainer/docker-compose-dev.yml

setup:
	pipx install poetry

shell:
	poetry shell

dependencies:
	poetry install

code:
	poetry run code .

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

exit:
	exit

build:
	$(DOCKER_CMD) -f $(COMPOSE_FILE) build

up:
	$(DOCKER_CMD) -f $(COMPOSE_FILE) build
	$(DOCKER_CMD) -f $(COMPOSE_FILE) up -d

stop:
	$(DOCKER_CMD) -f $(COMPOSE_FILE) stop

down:
	$(DOCKER_CMD) -f $(COMPOSE_FILE) down

rmi:
	$(DOCKER_CMD) -f $(COMPOSE_FILE) down --rmi all -v

ps:
	$(DOCKER_CMD) -f $(COMPOSE_FILE) ps

restart: down up

logs:
	$(DOCKER_CMD) -f $(COMPOSE_FILE) logs
