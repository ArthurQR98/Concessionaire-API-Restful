const BaseRepository = require('./base');
let _user = null;

class UserRepository extends BaseRepository {
    constructor({ User }) {
        super(User);
        _user = User;
    }

    async findEmail(email) {
        const user = await _user.findOne({ email });
        return user;
    }
}

module.exports = UserRepository;