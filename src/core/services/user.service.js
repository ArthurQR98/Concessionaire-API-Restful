const BaseService = require('./base.service');
let _userRepository = null;

class UserService extends BaseService {
    constructor({ UserRepository }) {
        super(UserRepository);
        _userRepository = UserRepository;
    }

    async getEmail(email) {
        const user = await _userRepository.findEmail(email);
        return user;
    }
}

module.exports = UserService;