mod handlers;
mod models;
mod services;

use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use dotenvy::dotenv;
use handlers::provider;

pub struct AppState {
    pub db_pool: sqlx::PgPool,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().expect(".env file not found");
    let port = std::env::var("PORT").unwrap_or("3000".to_owned());

    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db_pool = sqlx::PgPool::connect(&db_url)
        .await
        .expect("Unable to connect to database");

    println!("🚀 Server running on port {port}");
    HttpServer::new(move || {
        let cors = Cors::default().allow_any_origin().allow_any_method();
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(AppState {
                db_pool: db_pool.clone(),
            }))
            .service(provider::provide_medicines_for_near_low)
    })
    .bind(("127.0.0.1", port.parse().unwrap()))?
    .run()
    .await
}
