const Tought = require('../models/Tought')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ToughtController {
    static async showToughts(req, res) {
        const search = req.query.search ? req.query.search : '';
        const order = req.query.order === 'old' ? 'ASC' : 'DESC'

        const toughtsData = await Tought.findAll({
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
        const toughts = toughtsData.map(result => result.get({
            plain: true
        }))

        // 0 para handlebars não é entendido como false
        let toughtsQty = toughts.length
        if (!toughtsData) {
            toughtsQty = false
        }

        res.render('toughts/home', {
            toughts,
            search,
            toughtsQty
        })
    }

    static async dashboard(req, res) {
        const userId = req.session.userId
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Tought,
            plain: true
        })

        if (!user) {
            res.redirect('/login')
            return
        }

        const toughts = user.Toughts.map(result => result.dataValues)
        const emptyToughts = toughts.length === 0

        res.render('toughts/dashboard', {
            toughts,
            emptyToughts
        })
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtSave(req, res) {
        // TODO: Chegar se o usuário informado existe
        const tought = {
            title: req.body.title,
            UserId: req.session.userId
        }

        try {
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async removeTought(req, res) {
        const id = req.body.id
        const UserId = req.session.userId

        try {
            await Tought.destroy({
                where: {
                    id: id,
                    UserId: UserId
                }
            })

            req.flash('message', 'Pensamento removido com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch (error) {
            console.log(error)
        }

    }

    static async updateTought(req, res) {
        const id =  req.params.id
        const tought = await Tought.findOne({
            where: {
                id: id
            },
            raw: true
        })

        res.render('toughts/edit', {
            tought
        })
    }

    static async updateToughtSave(req, res) {
        const id = req.body.id        
        const tought = {
            title: req.body.title,
        }

        try {
            await Tought.update(tought, {
                where: {
                    id: id
                }
            })
            req.flash('message', 'Pensamento autualizado com sucesso!')
    
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
}