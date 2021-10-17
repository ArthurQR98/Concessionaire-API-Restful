const mapper = require('automapper-js');
const { SaleDto } = require('../../core/dtos');
let _saleService = null;

class SaleController {
    constructor({ SaleService }) {
        _saleService = SaleService;
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        let sales = await _saleService.getAll(pageSize, pageNum);
        sales = sales.map(sale => mapper(SaleDto, sale));
        return res.send(sales);
    }

    async create(req, res) {
        const { body } = req;
        const createdSale = await _saleService.createSale(body);
        const sale = mapper(SaleDto, createdSale);
        return res.status(201).send(sale);
    }
}

module.exports = SaleController;