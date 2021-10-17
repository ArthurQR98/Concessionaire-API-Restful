if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
// TODO: Agregar swagger para este proyecto
module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    CACHE_KEY: process.env.CACHE_KEY,
    SWAGGER_PATH: `../../infrastructure/config/swagger/${process.env.SWAGGER_DOC}.json`
}