import express from 'express'
import cors from 'cors'
import session from 'express-session'

import collegeRouter from './routes/CollegeApi'
import menuItemRouter from './routes/MenuItemApi'
import userRouter from './routes/UserApi'
import transactionRouter from './routes/TransactionHistoryApi'
import paymentRouter from './routes/PaymentApi'
import notifsRouter from './routes/PushNotificationsApi'

import passport from './controllers/Auth'

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

const port = process.env.PORT || 3000

// API Routes
app.use('/api/colleges', collegeRouter)
app.use('/api/menu_items', menuItemRouter)
app.use('/api/transactions', transactionRouter)
app.use('/api/users', userRouter)
app.use('/api/payments', paymentRouter)
app.use('/api/notifs', notifsRouter)

passport(app)

app.listen(port, () => {
  console.log(`Deployed at localhost:${port}`)
})
