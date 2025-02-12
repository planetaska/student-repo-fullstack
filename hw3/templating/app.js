const express = require('express')
const app = express()
const port = 3000

// Set Pug as default templating engine
app.set('view engine', 'pug')

// Serve assets as static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
