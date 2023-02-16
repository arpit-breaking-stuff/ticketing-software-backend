import dotenv from 'dotenv'
dotenv.config()


export const AppEnv = {
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL
}