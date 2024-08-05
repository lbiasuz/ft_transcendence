FROM python:3.12-slim

USER root
RUN pip install poetry && pip install --upgrade pip
ENV PATH="${PATH}:/root/.poetry/bin:$HOME/.poetry/bin/poetry"

WORKDIR /app
COPY pyproject.toml /app/
COPY poetry.lock /app/
COPY ../.env .
RUN poetry install

ADD ../ft_transcendence/ /app/
RUN poetry run python manage.py collectstatic --noinput

EXPOSE 8000

# CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["poetry", "run", "gunicorn", "ft_transcendence.wsgi:application", "--bind", "0.0.0.0:8000"]
