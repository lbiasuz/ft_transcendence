FROM python:3.12-slim

EXPOSE 8000

COPY ./ ./
RUN pip install requests psycopg2-binary && pip install -r .devcontainer/requirements.txt
COPY .devcontainer/entrypoint.sh /usr/local/bin/entrypoint.sh
CMD ["python ft_transcendence/manage.py runserver"]
