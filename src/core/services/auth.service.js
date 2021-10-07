const { Error } = require('../../infrastructure/shared');
const { JwtHelper } = require('../../infrastructure/helpers');
let _userService = null;

class AuthService {
    constructor({ UserService }) {
        _userService = UserService;
    }

    async signIn(user) {
        const { email, password } = user;
        const userExist = await _userService.getEmail(email);
        if (!userExist) {
            const error = Error(404, "User does not exist");
            return error;
        }

        const validPassword = userExist.comparePasswords(password);
        if (!validPassword) {
            const error = Error(400, "Invalid Password");
            return error;
        }

        const userToEncode = {
            email: userExist.email,
            role: userExist.role,
            id: userExist._id
        };
        const token = JwtHelper.generateToken(userToEncode);

        return { token };
    }
}

module.exports = AuthService;