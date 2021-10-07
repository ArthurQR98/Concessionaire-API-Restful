const mapper = require('automapper-js');
const { SignUpDto } = require('../../core/dtos');
const { Error } = require('../../infrastructure/shared');
let _authService = null;
let _userService = null;

class AuthController {
    constructor({ UserService, AuthService }) {
        _userService = UserService;
        _authService = AuthService;
    }
    async signUp(req, res) {
        const { body } = req;
        let signup = mapper(SignUpDto, body);
        const userExist = await _userService.getEmail(body.email);
        if (userExist) {
            const error = Error(400, "User already exists")
            return error;
        }
        await _userService.create(signup);
        return res.status(201).send({ message: "Register success" });
    }

    async signIn(req, res) {
        const { body } = req;
        const creds = await _authService.signIn(body);
        return res.send(creds);
    }
}

module.exports = AuthController;