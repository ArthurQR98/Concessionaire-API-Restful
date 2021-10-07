const BaseService = require('./base.service');
let _companyRepository = null;

class CompanyService extends BaseService {
    constructor({ CompanyRepository }) {
        super(CompanyRepository);
        _companyRepository = CompanyRepository;
    }
}

module.exports = CompanyService;