const express = require('express')
const exbhbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./db/conn')

const app = express()

// Models
const Tought = require('./models/Tought')
const User = require('./models/User')

// Import Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// Import Controller
const ToughtController = require('./controllers/ToughtController')

// Template engine
app.engine('handlebars', exbhbs.engine())
app.set('view engine', 'handlebars')

// Receive response in res.body as json
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// Session middleware
app.use(
    session({
        name: 'session',
        secret: 'our_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            // require('os').tmpdir() retorna o caminho do diretório temporário do sistema.
            // require('path').join() combina o caminho do diretório temporário com o nome do subdiretório 'sessions'
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        }
    })
)

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next) => {
    if (req.session.userId) {
        res.locals.session = req.session
    }

    next()
})

// Routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showToughts)

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(error => console.log(error))