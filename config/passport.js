const User = require('../models/user')

const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
}

passport.use(new JwtStrategy(jwtOptions, async function (req, jwtPayload, done) {
  try {
    const user = await User.findOne({ account: jwtPayload.account })
    if (user) {
      req.user = user

      return done(null, user);
    } else {
      return done(null, false);
    }

  } catch (err) {
    done(err)
  }

}))
