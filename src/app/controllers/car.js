const mapper = require('automapper-js');
const { CarDto } = require('../../core/dtos');
let _carService = null;
class CarController {
    constructor({ CarService }) {
        _carService = CarService;
    }

    async get(req, res) {
        const { carId } = req.params;
        let car = await _carService.get(carId);
        car = mapper(CarDto, car);
        return res.send(car);
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        let cars = await _carService.getAll(pageSize, pageNum);
        cars = cars.map(car => mapper(CarDto, car));
        return res.send(cars);
    }

    async create(req, res) {
        const { body } = req;
        const createdCar = await _carService.createEmbedded(body);
        const car = mapper(CarDto, createdCar)
        return res.status(201).send(car);
    }

    async update(req, res) {
        const { body } = req;
        const { carId } = req.params;
        const updatedCar = await _carService.updateEmbedded(carId, body);
        return res.send(updatedCar);
    }

    async delete(req, res) {
        const { carId } = req.params;
        const deleteCar = await _carService.delete(carId);
        return res.send(deleteCar);
    }
}

module.exports = CarController;