const { Router } = require('express');
const { ParseIntMiddleware, CacheMiddleware } = require('../../infrastructure/middlewares')
const { CACHE_TIME } = require('../../infrastructure/helpers');
module.exports = function ({ DistributorController }) {
    const router = Router();

    router.get("/", [ParseIntMiddleware, CacheMiddleware(CACHE_TIME.TEN_MINUTES)], DistributorController.getAll);
    router.post("/", DistributorController.create);
    router.patch("/:distributorId", [ParseIntMiddleware], DistributorController.update);
    router.delete("/:distributorId", [ParseIntMiddleware], DistributorController.delete);
    return router;
}