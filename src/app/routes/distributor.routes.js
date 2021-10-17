const { Router } = require('express');
const { ParseIntMiddleware, CacheMiddleware, AuthMiddleware, RoleMiddleware } = require('../../infrastructure/middlewares')
const { Role } = require('../../infrastructure/helpers');
const { CACHE_TIME } = require('../../infrastructure/helpers');
module.exports = function ({ DistributorController }) {
    const router = Router();

    router.get("/", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.User, Role.Admin]), CacheMiddleware(CACHE_TIME.TEN_MINUTES)], DistributorController.getAll);
    router.post("/", [AuthMiddleware, RoleMiddleware([Role.Admin])], DistributorController.create);
    router.patch("/:distributorId", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.Admin])], DistributorController.update);
    router.delete("/:distributorId", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.Admin])], DistributorController.delete);
    return router;
}