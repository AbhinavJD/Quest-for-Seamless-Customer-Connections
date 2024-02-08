# setting up container
FROM python:3.7.1
RUN python -m pip install --upgrade pip

WORKDIR /usr/src/quest_ceadar
COPY ./app ./app
COPY requirements.txt requirements.txt
# install python dependencies
RUN pip3 install -r requirements.txt
# Load environment variables from .env file
COPY .env .env
RUN set -o allexport; source .env; set +o allexport
