FROM python:3.10.14-bookworm

EXPOSE 8000/tcp
EXPOSE 8000/udp

COPY ./ ./
RUN ls -ls
RUN pip install poetry && python -m pip install Django==4.2 && pip install psycopg2-binary && poetry install
RUN ls -ls
RUN poetry run python ft_transcendence/manage.py migrate
RUN poetry run python ft_transcendence/manage.py collectstatic --noinput
CMD ["poetry run python ft_transcendence/manage.py runserver"]
