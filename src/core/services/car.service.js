const { Error } = require('../../infrastructure/shared');
const BaseService = require('./base.service');
let _carRepository = null;
let _distributorRepository = null;
let _companyRepository = null;

class CarService extends BaseService {
    constructor({ CarRepository, DistributorRepository, CompanyRepository }) {
        super(CarRepository)
        _carRepository = CarRepository;
        _distributorRepository = DistributorRepository;
        _companyRepository = CompanyRepository;
    }

    async createEmbedded(body) {
        const { company, distributor } = body;
        const isExistDistributor = await _distributorRepository.get(distributor);
        const isExistCompany = await _companyRepository.get(company);
        if (!isExistDistributor && !isExistCompany) {
            const error = Error(404, "Distributor or company does not found");
            return error;
        }
        return await _carRepository.create({ ...body, distributor: isExistDistributor });
    }

    async updateEmbedded(id = carId, body) {
        const { company, distributor } = body;
        const isExistDistributor = await _distributorRepository.get(distributor);
        const isExistCompany = await _companyRepository.get(company);
        const isExistCar = await _carRepository.get(id);
        if (!isExistCar) {
            const error = Error(404, "Entity does not found");
            return error;
        }
        if (!isExistDistributor && !isExistCompany) {
            const error = Error(404, "Distributor or company does not found");
            return error;
        }
        const update = Object.assign({}, { ...body, distributor: isExistDistributor });
        return await _carRepository.update(id, update);
    }
}

module.exports = CarService;