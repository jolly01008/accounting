const passport = require('passport')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(err.status || 401).json({ status: 'error', message: 'unauthorized' })
    }
    next()
  })(req, res, next)
}

module.exports = authenticated
