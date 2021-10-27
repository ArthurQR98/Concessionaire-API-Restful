const { UserRepository } = require('../../../src/core/domian/repositories');
const mockingoose = require('mockingoose');
const { User } = require('../../../src/core/domian/models');
let { UserModelMock: { user, users } } = require('../../mocks');

describe("User Repository Test", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    it("Should return a user by id", async () => {
        const _user = { ...user };
        mockingoose(User).toReturn(user, "findOne");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.get(_user._id);
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should return a user collection", async () => {
        users = users.map(user => {
            return user;
        });

        mockingoose(User).toReturn(users, "find");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users);
    })

    it("Should update an especific user by id", async () => {
        const _user = { ...user };
        mockingoose(User).toReturn(_user, "findOneAndUpdate");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.update(_user._id, {
            "name": "monica santhiago"
        });
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    })

    it("Should delete an especific user by id", async () => {
        mockingoose(User).toReturn(user, "findOneAndDelete");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.delete(user._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    })
})