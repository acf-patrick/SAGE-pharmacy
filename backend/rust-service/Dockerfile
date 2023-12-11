FROM ubuntu:22.04

WORKDIR /server

ADD server server
RUN chmod +x server

ADD docker.env .env

EXPOSE 8080

ENTRYPOINT [ "./server" ]