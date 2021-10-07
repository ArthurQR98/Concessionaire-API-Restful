const mapper = require('automapper-js');
const { CompanyDto } = require('../../core/dtos');
let _companyService = null;

class CompanyController {
    constructor({ CompanyService }) {
        _companyService = CompanyService;
    }

    async get(req, res) {
        const { companyId } = req.params;
        let company = await _companyService.get(companyId);
        company = mapper(CompanyDto, company);
        return res.send(company);
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        let companies = await _companyService.getAll(pageSize, pageNum);
        companies = companies.map(company => mapper(CompanyDto, company));
        return res.send(companies);
    }

    async create(req, res) {
        const { body } = req;
        const createdCompany = await _companyService.create(body);
        const company = mapper(CompanyDto, createdCompany);
        return res.status(201).send(company);
    }

    async update(req, res) {
        const { body } = req;
        const { companyId } = req.params;
        const updatedCompany = await _companyService.update(companyId, body);
        return res.send(updatedCompany);
    }

    async delete(req, res) {
        const { companyId } = req.params;
        const deleteCompany = await _companyService.delete(companyId);
        return res.send(deleteCompany);
    }
}

module.exports = CompanyController;