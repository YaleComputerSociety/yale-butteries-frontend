import express, { Application } from 'express'
import cors from 'cors'
import path from 'path'

import gameRoutes from '../routes/imgamesapi'

import ImGame from '../models/'

const app: Application = express()

const port = process.env.APP_PORT || 3000

// Use -> Integrate what's put in the () into the actual APP

// /api/intramurals/4 < Primary Key of 4 (Path parameters)

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cors())

const static_root = path.join(__dirname, 'frontend', 'dist')

// Index -> Root of IM games
// Show -> Reveal everything
// Both are connected to root, only difference is if it's passed into the game, IM GAME with key, and return the object discussed.
// No number after the resource, return all the IM games

app.get('/apicall', async (_, res) => {
  const targetGame = await ImGame.findById(5)
})

// API Routes
// app.use('/api/intramurals', gameRoutes)

// app.get('/api/ims', gameControllers.getAllGames)

app.use(express.static(static_root))

app.get('*', (_, res) => {
  res.sendFile('index.html', { root: static_root })
})

app.listen(port, () => {
  console.log(`Deployed on port ${port}.`)
})
