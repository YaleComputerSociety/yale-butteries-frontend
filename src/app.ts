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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

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

app.use(express.static(static_root))

app.post('/pay', async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'Please enter a name' })
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(100),
      currency: 'USD',
      payment_method_types: ['card'],
      metadata: { name },
    })
    const clientSecret = paymentIntent.client_secret
    res.json({ message: 'Payment initiated', clientSecret })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// app.get('*', (_, res) => {
//   res.sendFile('index.html', { root: static_root })
// })

app.listen(port, () => {
  console.log(`Deployed on port ${port}.`)
})
