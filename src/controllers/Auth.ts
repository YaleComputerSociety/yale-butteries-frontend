import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-cas'

type User = {
  netId: string
}

passport.use(
  new Strategy(
    {
      ssoBaseURL: 'https://secure.its.yale.edu/cas',
      serverBaseURL: 'https://yale-butteries.herokuapp.com/', // TODO: figure out a way to automatically switch between https://yale-butteries.herokuapp.com/ and localhost:3000 depending on if deployed to production
    },
    function (login, done) {
      return done(null, {
        netId: login,
      })
    }
  )
)

passport.serializeUser<User>(function (user: any, done) {
  done(null, user.netId)
})

passport.deserializeUser(function (netId, done) {
  done(null, {
    netId,
  })
})

export default (app: express.Express): void | express.RequestHandler => {
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/cas', function (req, res, next) {
    passport.authenticate('cas', function (err, user, info) {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.redirect('/')
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err)
        }
        res.send(JSON.stringify(user))
      })
    })(req, res, next)
  })
}
