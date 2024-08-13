# ft_transcendence

42 network project ft_transcendence

### Instalação de dependencias para o sistema

``` sh
pip install psycopg2-binary
```

### Para instalação do Poetry e execução do shell seguimos esses passos:

``` sh
poetry install

poetry run ft_transcendence/manage.py migrate
poetry run ./ft_transcendence/manage.py runserver
```

### Testes unitarios com Django

para seguir com a estrutura de testes basta seguir essa [referencia](https://docs.djangoproject.com/en/4.2/internals/contributing/writing-code/unit-tests/)

para integração com coverage e runtests segue a [referencia](https://docs.djangoproject.com/en/4.2/topics/testing/advanced/#topics-testing-code-coverage)


``` sh
poetry run ft_transcendence/runtests.py
```

``` sh
poetry run coverage run ./ft_transcendence/runtests.py

poetry run coverage report
```

Rodar o certificado
```sh
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -out cert.crt  -keyout cert.key -subj "/C=BR/ST=São Paulo/L=São Paulo/O=42SP/OU=transcender/CN=localhost/"
```
