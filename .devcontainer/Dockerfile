FROM python:3.12-slim

USER root
RUN pip install poetry
ENV PATH="${PATH}:/root/.poetry/bin:$HOME/.poetry/bin/poetry"

WORKDIR /app
COPY pyproject.toml /app/
COPY poetry.lock /app/
RUN poetry install

ADD . /app/
WORKDIR /app/ft_transcendence

EXPOSE 8000

CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]