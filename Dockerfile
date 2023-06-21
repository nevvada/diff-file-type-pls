FROM python:3.11

WORKDIR /app

COPY ./src /app/src
COPY ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

ENTRYPOINT ["python", "-m", "src.diff-file-type-pls.main"]
