FROM rust:latest

WORKDIR /rust-api

COPY . .

ADD docker.env .env

# Allow build without a database connection
ENV SQLX_OFFLINE=true

RUN ls -lha .

RUN cargo build --release

EXPOSE 3000

ENTRYPOINT [ "/rust-api/target/release/rust-api" ]