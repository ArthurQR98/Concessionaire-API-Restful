const { Router } = require('express');
const { ParseIntMiddleware, CacheMiddleware, AuthMiddleware, RoleMiddleware } = require('../../infrastructure/middlewares')
const { Role } = require('../../infrastructure/helpers');
const { CACHE_TIME } = require('../../infrastructure/helpers');

module.exports = function ({ CompanyController }) {
    const router = Router();

    router.get("/", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.User, Role.Admin]), CacheMiddleware(CACHE_TIME.TEN_MINUTES)], CompanyController.getAll);
    router.get("/:companyId", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.User, Role.Admin])], CompanyController.get);
    router.post("/", [AuthMiddleware, RoleMiddleware([Role.Admin])], CompanyController.create);
    router.patch("/:companyId", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.Admin])], CompanyController.update);
    router.delete("/:companyId", [ParseIntMiddleware, AuthMiddleware, RoleMiddleware([Role.Admin])], CompanyController.delete);
    return router;
}