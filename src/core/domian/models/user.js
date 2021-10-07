const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

const validRole = {
    values: ['Admin', 'Editor', 'User'],
    message: '{VALUE} no es un rol válido.'
}

const schema = Schema({
    name: {
        type: String
    },
    isCustomer: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: validRole,
        default: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

schema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
}

schema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});

const UserModel = mongoose.model('User', schema);
module.exports = UserModel;

