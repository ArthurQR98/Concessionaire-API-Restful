const BaseRepository = require('./base');
let _distributor = null;

class DistributorRepository extends BaseRepository {
    constructor({ Distributor }) {
        super(Distributor);
        _distributor = Distributor;
    }
}

module.exports = DistributorRepository;