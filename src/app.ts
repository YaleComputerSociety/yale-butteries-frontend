import express, { Application } from 'express'
import cors from 'cors'
import path from 'path'
import db from './models'

import gameRouter from './routes/ImGameApi'
import userRouter from './routes/UserApi'
import statRouter from './routes/StatApi'
import eventRouter from './routes/EventApi'
import userEventOccurenceRouter from './routes/UserEventOccurrenceApi'
import roomRouter from './routes/RoomApi'
import eventOccurrenceRouter from './routes/EventOccurrenceApi'

const app: Application = express()

const port = process.env.APP_PORT || 3000

const { PositionEventType } = db

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cors())

const static_root = path.join(__dirname, 'frontend', 'dist')

app.get('/apicall', async (_, res) => {
  const test = await PositionEventType.findOne({ where: { id: 1 } })
  res.send(JSON.stringify(test))
})

// API Routes
app.use('/api/games', gameRouter)
app.use('/api/users', userRouter)
app.use('/api/stats', statRouter)
app.use('/api/events', eventRouter)
app.use('/api/usereventoccurrences', userEventOccurenceRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/eventoccurrences', eventOccurrenceRouter)

app.use(express.static(static_root))

app.get('*', (_, res) => {
  res.sendFile('index.html', { root: static_root })
})

app.listen(port, () => {
  console.log(`Deployed on port ${port}.`)
})
