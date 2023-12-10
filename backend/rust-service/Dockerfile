FROM scratch

COPY server .

ADD docker.env .env

EXPOSE 3000

ENTRYPOINT [ "server" ]