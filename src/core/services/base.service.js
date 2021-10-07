const { Error } = require('../../infrastructure/shared');
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async get(id) {
        if (!id) {
            const error = Error(400, "id must be sent");
            return error;
        }
        const currentEntity = await this.repository.get(id);

        if (!currentEntity) {
            const error = Error(404, "entity does not found");
            return error;
        }
        return currentEntity;
    }

    async getAll(pageSize, pageNum) {
        return await this.repository.getAll(pageSize, pageNum);
    }

    async create(entity) {
        return await this.repository.create(entity);
    }

    async update(id, entity) {
        if (!id) {
            const error = Error(400, "id must be sent");
            return error;
        }
        const currentEntity = await this.repository.get(id);

        if (!currentEntity) {
            const error = Error(404, "entity does not found");
            return error;
        }

        return await this.repository.update(id, entity);
    }

    async delete(id) {
        if (!id) {
            const error = Error(400, "id must be sent");
            return error;
        }
        const currentEntity = await this.repository.get(id);
        if (!currentEntity) {
            const error = Error(404, "entity does not found");
            return error;
        }

        return await this.repository.delete(id);
    }
}

module.exports = BaseService;