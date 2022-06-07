export const config = {
    PORT: +process.env.PORT || 8080,
    API_PREFIX: process.env.API_PREFIX || '/api',
    DB_NAME: process.env.DB_NAME || 'postgres',
    DB_USER: process.env.DB_NAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || "deniskaSUPER12345",
    DB_HOST:  process.env.DB_HOST || "localhost",
    DB_PORT: +process.env.DB_PORT || 5432,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "jwt-secret-key",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "jwt-refresh-secret-key"
}