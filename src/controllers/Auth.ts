import type express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-cas'

interface User {
  netId: string
}

const port = process.env.PORT ?? 3000
export const environment = process.env.NODE_ENV ?? 'development'
export const url = environment === 'production' ? 'https://yale-butteries.herokuapp.com' : `http://localhost:${port}`

passport.use(
  new Strategy(
    {
      ssoBaseURL: 'https://secure.its.yale.edu/cas',
      serverBaseURL: url
    },
    function (login, done) {
      return done(null, {
        netId: login
      })
    }
  )
)

passport.serializeUser<User>(function (user: any, done) {
  done(null, user.netId)
})

passport.deserializeUser(function (netId, done) {
  done(null, {
    netId
  })
})

export default (app: express.Express): void | express.RequestHandler => {
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/cas', function (req, res, next) {
    passport.authenticate('cas', function (err, user) {
      if (err != null) {
        next(err); return
      }

      if (user == null) {
        res.redirect('/'); return
      }

      req.logIn(user, function (err) {
        if (err != null) {
          next(err); return
        }
        res.send(JSON.stringify(user))
      })
    })(req, res, next)
  })
}
