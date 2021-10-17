const { Router } = require('express');
const { ParseIntMiddleware, CacheMiddleware, AuthMiddleware, RoleMiddleware } = require('../../infrastructure/middlewares')
const { Role } = require('../../infrastructure/helpers');
const { CACHE_TIME } = require('../../infrastructure/helpers');

module.exports = function ({ UserController }) {
    const router = Router();

    router.get("/", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.User, Role.Admin]), CacheMiddleware(CACHE_TIME.TEN_MINUTES)], UserController.getAll);
    router.get("/:userId", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.User, Role.Admin])], UserController.get);
    router.post("/", [AuthMiddleware, RoleMiddleware([Role.Admin])], UserController.create);
    router.patch("/:userId", [AuthMiddleware, RoleMiddleware([Role.Admin])], UserController.update);
    router.delete("/:userId", [AuthMiddleware, RoleMiddleware([Role.Admin])], UserController.delete);
    return router;
}