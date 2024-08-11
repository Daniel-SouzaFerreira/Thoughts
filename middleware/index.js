const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const path = require('path')
const os = require('os')
const FileStore = require('session-file-store')(session)
const config = require('../config/config')

module.exports = app => {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.use(session({
        name: 'session',
        secret: config.session.secret,
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: path.join(os.tmpdir(), 'sessions')
        }),
        cookie: config.session.cookie
    }))

    app.use(flash())

    app.use(express.static('public'))

    app.use((req, res, next) => {
        if (req.session.userId) {
            res.locals.session = req.session
        }
        next()
    })
}
