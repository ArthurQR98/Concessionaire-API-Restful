const mapper = require('automapper-js');
const { UserDto } = require('../../core/dtos');
let _userService = null;

class UserController {
    constructor({ UserService }) {
        _userService = UserService;
    }

    async get(req, res) {
        const { userId } = req.params;
        let user = await _userService.get(userId);
        user = mapper(UserDto, user);
        return res.send(user);
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        let users = await _userService.getAll(pageSize, pageNum);
        users = users.map(user => mapper(UserDto, user));
        return res.send(users);
    }

    async create(req, res) {
        const { body } = req;
        const createdUser = await _userService.create(body);
        const user = mapper(UserDto, createdUser);
        return res.status(201).send(user);
    }

    async update(req, res) {
        const { body } = req;
        const { userId } = req.params;
        let updatedUser = await _userService.update(userId, body);
        updatedUser = mapper(UserDto, updatedUser);
        return res.send(updatedUser);
    }

    async delete(req, res) {
        const { userId } = req.params;
        const deleteUser = await _userService.delete(userId);
        return res.send(deleteUser);
    }
}

module.exports = UserController;