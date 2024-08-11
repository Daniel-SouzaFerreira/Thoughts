module.exports = {
    session: {
        secret: 'our_secret',
        cookie: {
            maxAge: 3600000,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
            secure: false
        }
    },
    port: 3000
}
