const BaseService = require('./base.service');
let _distributorRepository = null;

class DistributorService extends BaseService {
    constructor({ DistributorRepository }) {
        super(DistributorRepository);
        _distributorRepository = DistributorRepository;
    }
}

module.exports = DistributorService;