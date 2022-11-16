import express, { Application } from 'express'
import cors from 'cors'
import path from 'path'
// import db from './models'

// import gameRouter from './routes/ImGameApi'
// import userRouter from './routes/UserApi'
// import statRouter from './routes/StatApi'
// import eventRouter from './routes/EventApi'
// import userEventOccurenceRouter from './routes/UserEventOccurrenceApi'
// import roomRouter from './routes/RoomApi'
// import eventOccurrenceRouter from './routes/EventOccurrenceApi'

import butteryMetaDataRouter from './routes/ButteryMetadataApi'
import collegeRouter from './routes/CollegeApi'
import ingredientRouter from './routes/IngredientApi'
import menuItemRouter from './routes/MenuItemApi'
import ratingRouter from './routes/RatingApi'
import transactionRouter from './routes/TransactionHistoryApi'
import userRouter from './routes/UserApi'
import paymentRouter from './routes/PaymentApi'

const app: Application = express()

const port = process.env.APP_PORT || 3000

// const { PositionEventType } = db

app.use('/stripe', express.raw({ type: '*/*' }))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cors())

const static_root = path.join(__dirname, 'frontend', 'dist')

// app.get('/apicall', async (_, res) => {
//   const test = await PositionEventType.findOne({ where: { id: 1 } })
//   res.send(JSON.stringify(test))
// })

// API Routes
app.use('/api/buttery_data', butteryMetaDataRouter)
app.use('/api/colleges', collegeRouter)
app.use('/api/ingredients', ingredientRouter)
app.use('/api/menu_items', menuItemRouter)
app.use('/api/ratings', ratingRouter)
app.use('/api/transactions', transactionRouter)
app.use('/api/users', userRouter)
app.use('/api/payments', paymentRouter)

app.use(express.static(static_root))

// app.get('*', (_, res) => {
//   res.sendFile('index.html', { root: static_root })
// })

app.listen(port, () => {
  console.log(`Deployed on port ${port}.`)
})
