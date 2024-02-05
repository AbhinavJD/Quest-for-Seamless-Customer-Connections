# setting up container
FROM python:3.7
RUN python -m pip install --upgrade pip

WORKDIR /usr/src/quest_ceadar
COPY ./app ./app
COPY requirements.txt requirements.txt
# install python dependencies
RUN pip3 install -r requirements.txt
