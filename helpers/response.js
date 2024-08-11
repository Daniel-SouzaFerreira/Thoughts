module.exports = {
    renderWithFlash: (req, res, view, flashMessage, redirectUrl) => {
        req.flash('message', flashMessage)
        req.session.save(() => {
            res.redirect(redirectUrl)
        })
    },
    handleError: (req, res, error, message, redirectUrl) => {
        console.log(error)
        req.flash('message', message)
        // TODO: implementar página de erro
        if (redirectUrl) {
            res.redirect(redirectUrl)
        } else {
            // res.redirect('/error')
        }
    }
}
