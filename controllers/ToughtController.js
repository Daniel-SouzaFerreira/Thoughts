const ToughtService = require('../services/ThoughtService')
const { renderWithFlash, handleError } = require('../helpers/response')

module.exports = class ToughtController {
    static async showToughts(req, res) {
        const search = req.query.search ? req.query.search : '';
        const order = req.query.order === 'old' ? 'ASC' : 'DESC'

        try {
            const toughtsData = await ToughtService.findAllToughts(search, order)
            const toughts = toughtsData.map(result => result.get({ plain: true }))
            // 0 para handlebars não é entendido como false
            const toughtsQty = toughtsData ? toughts.length : false;

            res.render('toughts/home', {
                toughts,
                search,
                toughtsQty
            })
        } catch (error) {
            handleError(req, res, error, 'Erro ao buscar todos pensamentos')
        }
    }

    static async showDashboard(req, res) {
        const userId = req.session.userId

        try {
            const user = await ToughtService.findUserWithToughts(userId)
            if (!user) {
                return res.redirect('/login')
            }

            const toughts = user.Toughts.map(result => result.dataValues)
            const emptyToughts = toughts.length === 0
            res.render('toughts/dashboard', {
                toughts,
                emptyToughts
            })
        } catch (error) {
            handleError(req, res, error, 'Erro ao carregar dashboard do usuário')
        }
    }

    static showCreateToughtForm(req, res) {
        res.render('toughts/create')
    }

    static async handleToughtCreation(req, res) {
        // TODO: Chegar se o usuário informado existe
        const title = req.body.title
        const userId = req.session.userId

        try {
            await ToughtService.createTought(title, userId)
            renderWithFlash(req, res, 'toughts/dashboard', 'Pensamento criado com sucesso!', '/toughts/dashboard')
        } catch (error) {
            handleError(req, res, error, 'Erro ao criar pensamento')
        }
    }

    static async removeTought(req, res) {
        const id = req.body.id
        const userId = req.session.userId

        try {
            await ToughtService.removeTought(id, userId)
            renderWithFlash(req, res, 'toughts/dashboard', 'Pensamento removido com sucesso!', '/toughts/dashboard')
        } catch (error) {
            handleError(req, res, error, 'Erro ao remover pensamento')
        }
    }

    static async showToughtUpdateForm(req, res) {
        const id =  req.params.id
        const tought = await ToughtService.findToughtById(id) 
        res.render('toughts/edit', { tought })
    }

    static async handleToughtUpdate(req, res) {
        const id = req.body.id 
        const title = req.body.title

        try {
            await ToughtService.updateTought(id, title)
            renderWithFlash(req, res, 'toughts/dashboard', 'Pensamento atualizado com sucesso!', '/toughts/dashboard')
        } catch (error) {
            handleError(req, res, error, 'Erro ao atualizar pensamento')
        }
    }
}