FROM alpine:3.14

WORKDIR /server

ADD server server
RUN chmod +x server

ADD docker.env .env

EXPOSE 3000

ENTRYPOINT [ "server" ]