const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

// helper
const { checkAuth } = require('../helpers/auth')

router.get('/add', checkAuth, ToughtController.showCreateToughtForm)
router.post('/add', checkAuth, ToughtController.handleToughtCreation)

router.get('/edit/:id', checkAuth, ToughtController.showToughtUpdateForm)
router.post('/edit', checkAuth, ToughtController.handleToughtUpdate)

router.get('/dashboard', checkAuth, ToughtController.showDashboard)

router.post('/remove', checkAuth, ToughtController.removeTought)

router.get('/', ToughtController.showToughts)

module.exports = router