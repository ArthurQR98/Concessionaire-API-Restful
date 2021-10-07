const mapper = require('automapper-js');
const { DistributorDto } = require('../../core/dtos');
let _distributorService = null;

class DistributorController {
    constructor({ DistributorService }) {
        _distributorService = DistributorService;
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        let distributors = await _distributorService.getAll(pageSize, pageNum);
        distributors = distributors.map(distributor => mapper(DistributorDto, distributor));
        return res.send(distributors);
    }

    async create(req, res) {
        const { body } = req;
        const createdDistributor = await _distributorService.create(body);
        const distributor = mapper(DistributorDto, createdDistributor);
        return res.status(201).send(distributor);
    }

    async update(req, res) {
        const { body } = req;
        const { distributorId } = req.params;
        const updatedDistributor = await _distributorService.update(distributorId, body);
        return res.send(updatedDistributor);
    }

    async delete(req, res) {
        const { distributorId } = req.params;
        const deleteDistributor = await _distributorService.delete(distributorId);
        return res.send(deleteDistributor);
    }
}

module.exports = DistributorController;