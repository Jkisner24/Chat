import dotenv from 'dotenv'

dotenv.config();

export default {
    PORT: process.env.PORT,
    URL_MONGO: process.env.MONGO_URL
}