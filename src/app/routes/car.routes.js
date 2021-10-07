const { Router } = require('express');
const { ParseIntMiddleware, CacheMiddleware, AuthMiddleware, RoleMiddleware } = require('../../infrastructure/middlewares')
const { Role } = require('../../infrastructure/helpers');
const { CACHE_TIME } = require('../../infrastructure/helpers');
module.exports = function ({ CarController }) {
    const router = Router();

    router.get("/", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.User]), CacheMiddleware(CACHE_TIME.TEN_MINUTES)], CarController.getAll);
    router.get("/:carId", [ParseIntMiddleware], CarController.get);
    router.post("/", CarController.create);
    router.patch("/:carId", [ParseIntMiddleware], CarController.update);
    router.delete("/:carId", [ParseIntMiddleware], CarController.delete);
    return router;
}