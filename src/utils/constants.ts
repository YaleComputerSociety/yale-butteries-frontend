// This file contains constants and environment variables to be used throughout the prooject

// Enviornment Variables
export const port = process.env.PORT ?? 3000
export const environment = process.env.NODE_ENV ?? 'development'
export const url = environment === 'production' ? 'https://yale-butteries.herokuapp.com' : `http://localhost:${port}`
export const sessionSecret = process.env.SESSION_SECRET_KEY ?? 'default_secret'

// Constants
export const MILLISECONDS_UNTIL_ORDER_IS_EXPIRED = 3600000 * 600
