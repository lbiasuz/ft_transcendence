FROM python:3.12-slim

USER root

ADD . /app/

WORKDIR /app/ft_transcendence

RUN apt update && apt install make
RUN pip install poetry

ENV PATH="${PATH}:/root/.poetry/bin:$HOME/.poetry/bin/poetry"

RUN poetry install

EXPOSE 8000

CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
