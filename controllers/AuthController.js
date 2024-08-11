const User = require('../models/User')
const AuthService = require('../services/AuthService')
const { handleError } = require('../helpers/response')

module.exports = class AuthController {

    static showLoginForm(req, res) {
        res.render('auth/login')
    }

    static async handleLogin(req, res) {
        const { email, password } = req.body

        try {
            const user = await AuthService.findUserByEmail(email)
            if (!user) {
                req.flash('message', 'Usuário não encontrado!')
                res.redirect('/login')
                return
            }
            
            const passwordMatch = AuthService.comparePasswords(password, user.password)
            if (!passwordMatch) {
                req.flash('message', 'Senha inválida!')
                res.redirect('/login')
                return
            }
    
            AuthController.initializeSession(req, res, user.id, 'Autenticação realizada com sucesso!')
        } catch (error) {
            handleError(req, res, error, 'Erro ao tentar fazer login. Tente novamente.', '/login')
        }
    }

    static showRegisterForm(req, res) {
        res.render('auth/register')
    }

    static async handleRegister(req, res) {
        const { name, email, password, confirmpassword } = req.body
        
        try {
            if (password !== confirmpassword) {
                req.flash('message', 'As senhas não conferem, tente novamente!')
                res.render('auth/register')
                return
            }
    
            const checkIfUserExists = await AuthService.findUserByEmail(email)
            if (checkIfUserExists) {
                req.flash('message', 'O email já está em uso!')
                res.render('auth/register')
                return
            }
    
            const createdUser = await User.create({
                name,
                email,
                password: AuthService.createHashPassword(password)
            })
            AuthController.initializeSession(req, res, createdUser.id, 'Cadastro realizado com sucesso!')
        } catch (error) {
            handleError(req, res, error, 'Erro ao registrar novo usuário. Tente novamente.')
        }
    }

    static logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/login')
        })
    }

    static initializeSession(req, res, userId, message) {
        req.session.userId = userId
        req.flash('message', message)
        req.session.save(() => {
            res.redirect('/')
        })
    }
}
