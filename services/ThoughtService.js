const Tought = require('../models/Tought')
const User = require('../models/User')
const { Op } = require('sequelize')

class ToughtService {
    static async findAllToughts(search, order) {
        return Tought.findAll({
            include: User,
            where: {
                title: {
                    [Op.like]: `%${search}%`
                }
            },
            order: [
                ['createdAt', order]
            ]
        })
    }

    static async findUserWithToughts(userId) {
        return User.findOne({
            where: { id: userId },
            include: Tought,
            plain: true
        })
    }

    static async createTought(title, userId) {
        return Tought.create({ title, UserId: userId })
    }

    static async removeTought(id, userId) {
        return Tought.destroy({
            where: { id, UserId: userId }
        })
    }

    static async findToughtById(id) {
        return Tought.findOne({
            where: { id },
            raw: true
        })
    }

    static async updateTought(id, title) {
        return Tought.update({ title }, { where: { id } })
    }
}

module.exports = ToughtService