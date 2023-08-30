import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-cas'

type User = {
  netId: string
}

const port = process.env.PORT || 3000
export const environment = process.env.NODE_ENV || 'development'
export const url =
  environment === 'production' ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : `http://localhost:${port}`

passport.use(
  new Strategy(
    {
      ssoBaseURL: 'https://secure.its.yale.edu/cas',
      serverBaseURL: url,
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
