const BaseRepository = require('./base');
let _company = null;

class CompanyRepository extends BaseRepository {
    constructor({ Company }) {
        super(Company);
        _company = Company;
    }
}

module.exports = CompanyRepository;