const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware } = require('../../infrastructure/middlewares');
const swaggerUI = require('swagger-ui-express');
const { SWAGGER_PATH } = require('../../infrastructure/config');
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function ({ HomeRoutes, CompanyRoutes, CarRoutes, DistributorRoutes, AuthRoutes, UserRoutes, SaleRoutes }) {
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes.use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression())

    apiRoutes.use("/home", HomeRoutes);
    apiRoutes.use("/auth", AuthRoutes);
    apiRoutes.use("/companies", CompanyRoutes);
    apiRoutes.use("/cars", CarRoutes);
    apiRoutes.use("/distributors", DistributorRoutes);
    apiRoutes.use("/users", UserRoutes);
    apiRoutes.use("/sales", SaleRoutes);

    router.use("/v1/api", apiRoutes);
    router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);
    return router;
}