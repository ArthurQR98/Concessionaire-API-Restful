const { Error } = require('../../infrastructure/shared');
const BaseService = require('./base.service');
let _saleRepository = null;
let _userRepository = null;
let _carRepository = null;

class SaleService extends BaseService {
    constructor({ SaleRepository, UserRepository, CarRepository }) {
        super(SaleRepository);
        _saleRepository = SaleRepository;
        _userRepository = UserRepository;
        _carRepository = CarRepository;
    }

    async createSale(data) {
        const { user, car } = data;
        const userExit = await _userRepository.get(user);
        const carExit = await _carRepository.get(car);
        if (!userExit) {
            const error = Error(404, "User does not found");
            return error;
        }
        if (!carExit) {
            const error = Error(404, "Car does not found");
            return error;
        }
        if (carExit.sold) {
            const error = Error(400, "Car is already sold");
            return error;
        }
        await _userRepository.update(user, { isCustomer: true })
        await _carRepository.update(car, { sold: true })
        return await _saleRepository.create(data);
    }
}

module.exports = SaleService;