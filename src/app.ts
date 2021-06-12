import express, {Application} from 'express'
import cors from 'cors'
import path from 'path'

const app: Application = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({
  extended: true,
}))
app.use(cors())

const static_root = path.join(__dirname, 'frontend', 'dist')

app.get('/apicall', (_, res) => {
  res.send('Well done!')
})

app.use(express.static(static_root))

app.get('*', (_, res) => {
  res.sendFile('index.html', { static_root });
});

app.listen(port, () => {
  console.log(`Deployed on port ${port}.`)
})