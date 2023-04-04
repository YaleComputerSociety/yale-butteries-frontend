import express, { Application } from 'express'
import cors from 'cors'
import path from 'path'

import collegeRouter from './routes/CollegeApi'
import menuItemRouter from './routes/MenuItemApi'
import userRouter from './routes/UserApi'
import transactionRouter from './routes/TransactionHistoryApi'
import paymentRouter from './routes/PaymentApi'
import notifsRouter from './routes/PushNotificationsApi'

const app: Application = express()

const port = process.env.APP_PORT || 3000

app.use('/stripe', express.raw({ type: '*/*' }))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cors())

const static_root = path.join(__dirname, 'frontend', 'dist')

// API Routes
app.use('/api/colleges', collegeRouter)
app.use('/api/menu_items', menuItemRouter)
app.use('/api/transactions', transactionRouter)
app.use('/api/users', userRouter)
app.use('/api/payments', paymentRouter)
app.use('/api/notifs', notifsRouter)

app.use(express.static(static_root))

app.listen(port, () => {
  console.log(`Deployed on port ${port}.`)
})
