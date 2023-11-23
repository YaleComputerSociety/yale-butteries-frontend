import type express from 'express'
import type { Request, Response } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-cas2'

interface AuthUser {
  netId: string
}

const port = process.env.PORT ?? 3000
export const environment = process.env.NODE_ENV ?? 'development'
export const url = environment === 'production' ? 'https://yale-butteries.herokuapp.com' : `http://localhost:${port}`

passport.use(
  new Strategy({ casURL: 'https://secure.its.yale.edu/cas' }, (username, profile, done) => {
    // TODO: create user right here instead of with separate endpoint call
    const user = { netId: username }
    console.log('user ', user)
    done(null, user)
  }
  )
)

passport.serializeUser<string>((user: AuthUser, done) => {
  console.log('Serialize User:', user, user.netId)
  done(null, user.netId)
})

passport.deserializeUser<AuthUser>((netId, done) => {
  console.log('Deserialize User ID:', netId)
  done(null, { netId })
})

export default (app: express.Express): void | express.RequestHandler => {
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/cas', (req: Request, res: Response, next) => {
    passport.authenticate('cas', function (err, user) {
      console.log('req.user: ', req.user)
      console.log('Authentication Callback - Error:', err, 'User:', user)
      if (err != null) {
        console.error('Authentication Error:', err)
        next(err)
        return
      }

      if (user == null) {
        console.log('No user found, redirecting to home.')
        res.redirect('/')
        return
      }

      req.logIn(user, function (err) {
        if (err != null) {
          console.error('Login Error:', err)
          next(err)
          return
        }
        console.log('Logged In User:', req.user)
        res.send(JSON.stringify(user))
      })
    })(req, res, next)
  })
}
