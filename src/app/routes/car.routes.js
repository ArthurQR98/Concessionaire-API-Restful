const { Router } = require('express');
const { ParseIntMiddleware, CacheMiddleware, AuthMiddleware, RoleMiddleware } = require('../../infrastructure/middlewares')
const { Role } = require('../../infrastructure/helpers');
const { CACHE_TIME } = require('../../infrastructure/helpers');
module.exports = function ({ CarController }) {
    const router = Router();

    router.get("/", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.User, Role.Admin]), CacheMiddleware(CACHE_TIME.TEN_MINUTES)], CarController.getAll);
    router.get("/:carId", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.User, Role.Admin])], CarController.get);
    router.post("/", [AuthMiddleware, RoleMiddleware([Role.Admin])], CarController.create);
    router.patch("/:carId", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.Admin])], CarController.update);
    router.delete("/:carId", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.Admin])], CarController.delete);
    return router;
}