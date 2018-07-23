const express = require('express')
const path = require('path')
const request = require('request')
const PORT = process.env.PORT || 5000

const app = express()

app
  .get('/events', (_, res) => {
    const URL = 'https://api.meetup.com/find/upcoming_events?key=TOKEN'

    request(URL, { json: true }, (err, _, body) => {
      err ? res.json({ error: err }) : res.json(body)
    })
  })

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
