const mapper = require('automapper-js');
const { SaleDto } = require('../../core/dtos');
let _saleService = null;

class SaleController {
    constructor({ SaleService }) {
        _saleService = SaleService;
    }

    async get(req, res) {
        const { saleId } = req.params;
        let sale = await _saleService.get(saleId);
        sale = mapper(SaleDto, sale);
        return res.send(sale);
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        let sales = await _saleService.getAll(pageSize, pageNum);
        sales = sales.map(sale => mapper(SaleDto, sale));
        return res.send(sales);
    }

    async create(req, res) {
        const { body } = req;
        const createdSale = await _saleService.create(body);
        const sale = mapper(SaleDto, createdSale);
        return res.status(201).send(sale);
    }

    async update(req, res) {
        const { body } = req;
        const { saleId } = req.params;
        const updatedSale = await _saleService.update(saleId, body);
        return res.send(updatedSale);
    }

    async delete(req, res) {
        const { saleId } = req.params;
        const deleteSale = await _saleService.delete(saleId);
        return res.send(deleteSale);
    }
}

module.exports = SaleController;