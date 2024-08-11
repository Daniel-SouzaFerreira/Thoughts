const express = require('express')
const exbhbs = require('express-handlebars')
const conn = require('./db/conn')
const { port } = require('./config/config')

const app = express()
initializeApp()

function initializeApp() {
    setupTemplateEngine()
    setupMiddlewares()
    setupRoutes()
    startServer()
}

function setupTemplateEngine() {
    app.engine('handlebars', exbhbs.engine())
    app.set('view engine', 'handlebars')
}

function setupMiddlewares() {
    require('./middleware')(app)
}

function setupRoutes() {
    const toughtsRoutes = require('./routes/toughtsRoutes')
    const authRoutes = require('./routes/authRoutes')
    const ToughtController = require('./controllers/ToughtController')

    app.use('/toughts', toughtsRoutes)
    app.use('/', authRoutes)
    app.get('/', ToughtController.showToughts)
}

function startServer() {
    conn
        .sync()
        .then(() => app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`)
        }))
        .catch(error => console.log(error))
}