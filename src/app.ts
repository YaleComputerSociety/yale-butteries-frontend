import express, { Application } from 'express'
import cors from 'cors'

import collegeRouter from './routes/CollegeApi'
import menuItemRouter from './routes/MenuItemApi'
import userRouter from './routes/UserApi'
import transactionRouter from './routes/TransactionHistoryApi'
import paymentRouter from './routes/PaymentApi'
import notifsRouter from './routes/PushNotificationsApi'

const port = process.env.PORT || 3000

const app: Application = express()
  .use('/stripe', express.raw({ type: '*/*' }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
app.use(cors()) // security vulnerability, change this before beta!

// API Routes
app.use('/api/colleges', collegeRouter)
app.use('/api/menu_items', menuItemRouter)
app.use('/api/transactions', transactionRouter)
app.use('/api/users', userRouter)
app.use('/api/payments', paymentRouter)
app.use('/api/notifs', notifsRouter)

app.listen(port, () => {
  console.log(`Deployed on port ${port}.`)
})
