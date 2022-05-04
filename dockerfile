FROM python:3.9.10

ENV PATH="/scripts:${PATH}"
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .
COPY ./scripts /scripts

RUN mkdir -p /public/static
RUN chmod +x /scripts/*

RUN useradd -ms /bin/bash user
RUN chown -R user:user /public
RUN chmod -R 755 /public
USER user

CMD ["web.sh"]
