# Description: Makefile for Django project
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
	poetry run coverage run --source='.' ft_transcendence/manage.py test
	poetry run coverage report

coverage-html:
	poetry run coverage run --source='.' ft_transcendence/manage.py test
	poetry run coverage html

exit:
	exit

build:
	docker-compose build

up:
	docker-compose -f .devcontainer/docker-compose.yml up --build -d

down:
	docker-compose -f .devcontainer/docker-compose.yml down --rmi all -v

logs:
	@docker-compose logs -f
