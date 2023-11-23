import express from 'express'
import cors from 'cors'
import session from 'express-session'
import 'reflect-metadata'

import collegeRouter from '@routes/CollegeApi'
import menuItemRouter from '@routes/MenuItemApi'
import userRouter from '@routes/UserApi'
import orderRouter from '@routes/OrderApi'
import paymentRouter from '@routes/PaymentApi'
import notifsRouter from '@routes/PushNotificationsApi'
import passport from '@controllers/Auth'
import errorHandler from '@middlewares/errorHandler'
import { port, url, sessionSecret } from '@utils/constants'
import { invalidUrlHandler } from '@src/middlewares/invalidUrlHandler'

const app: express.Express = express()
  // .use('/stripe', express.raw({ type: '*/*' }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false
    })
  )
  .use(cors()) // need to change this

// API Routes
app.use('/api/colleges', collegeRouter)
app.use('/api/menu-items', menuItemRouter)
app.use('/api/orders', orderRouter)
app.use('/api/users', userRouter)
app.use('/api/payments', paymentRouter)
app.use('/api/notifs', notifsRouter)

app.use(invalidUrlHandler)
app.use(errorHandler)

passport(app)

app.listen(port, () => {
  console.log(`Deployed at ${url}`)
})
