import type express from 'express'
import type { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-cas2'

interface AuthUser {
  netId: string
}

passport.use(
  new Strategy({ casURL: 'https://secure.its.yale.edu/cas' }, (username: string, profile, done) => {
    // TODO: create user right here instead of with separate endpoint call
    const user = { netId: username }
    done(null, user)
  }
  )
)

passport.serializeUser<string>((user: AuthUser, done) => {
  done(null, user.netId)
})

passport.deserializeUser<AuthUser>((netId, done) => {
  done(null, { netId })
})

export default (app: express.Express): void => {
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/cas', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('cas', (err: Error | null, user: Express.User | null) => {
      if (err != null) {
        console.error('Authentication Error:', err)
        next(err)
        return
      }

      if (user == null) {
        console.log('No user found')
        res.redirect('/')
        return
      }

      req.logIn(user, (err: Error) => {
        if (err != null) {
          console.error('Login Error:', err)
          next(err)
          return
        }
        res.json(user)
      })
    })(req, res, next)
  })
}
