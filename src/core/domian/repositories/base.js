class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async get(id) {
        const document = await this.model.findById(id);
        if (!document) {
            return false;
        }
        return document;
    }
    async getAll(pageSize = 10, pageNum = 1) {
        // skip - limit
        const skips = pageSize * (pageNum - 1);
        return await this.model.find().skip(skips).limit(pageSize);
    }
    async create(entity) {
        return await this.model.create(entity);
    }
    async update(id, entity) {
        const document = await this.model.findByIdAndUpdate(id, entity, { new: true });
        if (!document) {
            return false;
        }
        return document;
    }
    async delete(id) {
        const document = await this.model.findByIdAndDelete(id);
        if (!document) {
            return false;
        }
        return true;
    }
}

module.exports = BaseRepository;