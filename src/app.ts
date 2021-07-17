import express, { Application } from 'express'
import cors from 'cors'
import path from 'path'
import db from '../models'

import gameRouter from '../routes/imgamesapi'
import userRouter from '../routes/userapi'
import statRouter from '../routes/statapi'
import eventRouter from '../routes/eventapi'
import usersEventRouter from '../routes/userseventapi'
import eventOccurenceRouter from '../routes/eventoccurrenceapi'

const app: Application = express()

const { ImGame } = db

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
app.use('/api/intramurals', gameRouter)
app.use('/api/users', userRouter)
app.use('/api/stats', statRouter)
app.use('/api/events', eventRouter)
app.use('/api/usersevents', usersEventRouter)
app.use('/api/eventoccurrences', eventOccurenceRouter)

app.use(express.static(static_root))

app.get('*', (_, res) => {
  res.sendFile('index.html', { root: static_root })
})

app.listen(port, () => {
  console.log(`Deployed on port ${port}.`)
})
