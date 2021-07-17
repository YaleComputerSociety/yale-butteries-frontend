import express, { Application } from 'express'
import cors from 'cors'
import path from 'path'
import db from '../models'

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

app.use(express.static(static_root))

app.get('*', (_, res) => {
  res.sendFile('index.html', { root: static_root })
})

app.listen(port, () => {
  console.log(`Deployed on port ${port}.`)
})
