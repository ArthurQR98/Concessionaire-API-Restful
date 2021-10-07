const { Router } = require('express');
const { ParseIntMiddleware, CacheMiddleware, AuthMiddleware, RoleMiddleware } = require('../../infrastructure/middlewares')
const { Role } = require('../../infrastructure/helpers');
const { CACHE_TIME } = require('../../infrastructure/helpers');

module.exports = function ({ UserController }) {
    const router = Router();

    router.get("/", [ParseIntMiddleware, CacheMiddleware(CACHE_TIME.TEN_MINUTES)], UserController.getAll);
    router.get("/:userId", [ParseIntMiddleware], UserController.get);
    router.post("/", [AuthMiddleware, RoleMiddleware([Role.Admin])], UserController.create);
    router.patch("/:userId", [ParseIntMiddleware], UserController.update);
    router.delete("/:userId", [ParseIntMiddleware], UserController.delete);
    return router;
}