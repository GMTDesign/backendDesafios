export function onlyActives(req, res, next) {
    if (!req.session['user']) {
        return res.redirect('/login')
    }
    next()
}