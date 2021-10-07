const BaseRepository = require('./base');
let _car = null;

class CarRepository extends BaseRepository {
    constructor({ Car }) {
        super(Car);
        _car = Car;
    }

    async updateEmbedded(cardId, data) {
        const car = await _car.findByIdAndUpdate(cardId, data, { new: true });
        return car;
    }
}

module.exports = CarRepository;