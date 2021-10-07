const { Router } = require('express');
const { ParseIntMiddleware, CacheMiddleware } = require('../../infrastructure/middlewares')
const { CACHE_TIME } = require('../../infrastructure/helpers');

module.exports = function ({ SaleController }) {
    const router = Router();

    router.get("/", [ParseIntMiddleware, CacheMiddleware(CACHE_TIME.TEN_MINUTES)], SaleController.getAll);
    router.get("/:saleId", [ParseIntMiddleware], SaleController.get);
    router.post("/", SaleController.create);
    router.patch("/:saleId", [ParseIntMiddleware], SaleController.update);
    router.delete("/:saleId", [ParseIntMiddleware], SaleController.delete);
    return router;
}