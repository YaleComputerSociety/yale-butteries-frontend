module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || null,
    database: 'college_hub_database_development',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || null,
    database: 'college_hub_database_test',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || null,
    database: 'college_hub_database_production',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
}
