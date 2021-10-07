const { Router } = require('express');
const { ParseIntMiddleware, CacheMiddleware } = require('../../infrastructure/middlewares')
const { CACHE_TIME } = require('../../infrastructure/helpers');

module.exports = function ({ CompanyController }) {
    const router = Router();

    router.get("/", [ParseIntMiddleware, CacheMiddleware(CACHE_TIME.TEN_MINUTES)], CompanyController.getAll);
    router.get("/:companyId", [ParseIntMiddleware], CompanyController.get);
    router.post("/", CompanyController.create);
    router.patch("/:companyId", [ParseIntMiddleware], CompanyController.update);
    router.delete("/:companyId", [ParseIntMiddleware], CompanyController.delete);
    return router;
}