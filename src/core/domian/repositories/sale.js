const BaseRepository = require('./base');
let _sale = null;

class SaleRepository extends BaseRepository {
    constructor({ Sale }) {
        super(Sale);
        _sale = Sale;
    }
}

module.exports = SaleRepository;