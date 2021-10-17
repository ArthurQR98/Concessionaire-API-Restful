const { Router } = require('express');
const { ParseIntMiddleware, CacheMiddleware, AuthMiddleware, RoleMiddleware } = require('../../infrastructure/middlewares')
const { Role } = require('../../infrastructure/helpers');
const { CACHE_TIME } = require('../../infrastructure/helpers');

module.exports = function ({ SaleController }) {
    const router = Router();

    router.get("/", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.User, Role.Admin]), CacheMiddleware(CACHE_TIME.TEN_MINUTES)], SaleController.getAll);
    router.post("/", [AuthMiddleware, RoleMiddleware([Role.Admin])], SaleController.create);
    return router;
}