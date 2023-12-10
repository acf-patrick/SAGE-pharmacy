FROM rust:latest

WORKDIR /rust-api

# Allow build without a database connection
ENV SQLX_OFFLINE=true

RUN cargo install sqlx-cli

COPY . .

ADD docker.env .env

RUN cargo clean

RUN cargo sqlx prepare

RUN ls -lha .

RUN cargo build --release

EXPOSE 3000

ENTRYPOINT [ "/rust-api/target/release/rust-api" ]