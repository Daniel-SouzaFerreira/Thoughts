const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.showLoginForm)
router.post('/login', AuthController.handleLogin)
router.get('/register', AuthController.showRegisterForm)
router.post('/register', AuthController.handleRegister)
router.get('/logout', AuthController.logout)

module.exports = router