import express from 'express'
import cors from 'cors'
import session from 'express-session'

import collegeRouter from './routes/CollegeApi'
import menuItemRouter from './routes/MenuItemApi'
import userRouter from './routes/UserApi'
import orderRouter from './routes/OrderApi'
import paymentRouter from './routes/PaymentApi'
import notifsRouter from './routes/PushNotificationsApi'
import passport from './controllers/Auth'

const port = process.env.PORT || 3000
export const environment = process.env.NODE_ENV || 'development'
export const url = environment === 'production' ? `https://yale-butteries.herokuapp.com` : `http://localhost:${port}`

const app: express.Express = express()
  .use('/stripe', express.raw({ type: '*/*' }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    session({
      secret: 'iw9nHenOw2andg3',
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(cors()) // security vulnerability, change this before alpha!

// API Routes
app.use('/api/colleges', collegeRouter)
app.use('/api/menu-items', menuItemRouter)
app.use('/api/orders', orderRouter)
app.use('/api/users', userRouter)
app.use('/api/payments', paymentRouter)
app.use('/api/notifs', notifsRouter)

passport(app)

app.listen(port, () => {
  console.log(`Deployed at ${url}`)
})
