const User = require('../models/User');
const bcrypt = require('bcryptjs');

class AuthService {
    static async findUserByEmail(email) {
        return await User.findOne({
             where: { 
                email 
            }
        });
    }

    static comparePasswords(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }

    static createHashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    static async createUser(userData) {
        return await User.create(userData);
    }
}

module.exports = AuthService;