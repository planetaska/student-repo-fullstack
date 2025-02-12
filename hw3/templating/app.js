const express = require('express')
const app = express()
const port = 3000

const axios = require('axios').default;
const _ = require('lodash');

// Set Pug as default templating engine
app.set('view engine', 'pug')

// Serve assets as static files
app.use(express.static('public'))

app.get(['/', '/home'], (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.get('/capitals', (req, res) => {
  // Fetch data from the REST API
  axios.get('https://restcountries.com/v3.1/all?fields=name,capital,flag')
    .then(response => {
      const capitals = response.data.map(country => ({
        name: country.name.common,
        capital: country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A',
        flag: country.flag
      }))

      // Pass the processed data to the view
      res.render('capitals', {
        title: 'Capitals',
        capitals
      })
    })
    .catch(error => {
      console.error('Error fetching countries:', error)
      res.status(500).send('An error occurred while fetching capitals data')
    })
})

app.get('/populous', (req, res) => {
  // Fetch data from the REST API
  axios.get('https://restcountries.com/v3.1/all?fields=name,flag,population')
    .then(response => {
      const populous = _(response.data)
        .filter(country => country.population >= 50000000)
        .map(country => ({
          name: country.name.common,
          population: country.population,
          flag: country.flag
        }))
        .orderBy(['population'], ['desc'])
        .value();

      // Pass the processed data to the view
      res.render('populous', {
        title: 'Populous',
        populous
      })
    })
    .catch(error => {
      console.error('Error fetching countries:', error)
      res.status(500).send('An error occurred while fetching populations data')
    })
})

app.get('/regions', (req, res) => {
  // Fetch data from the REST API
  axios.get('https://restcountries.com/v3.1/all?fields=region')
    .then(response => {
      const regions = _(response.data)
        .filter(country => country.region) // Ensure the region is not null/undefined
        .groupBy('region')
        .map((countries, region) => ({
          name: region,
          countries: countries.length
        }))
        .value();

      // Pass the processed data to the view
      res.render('regions', {
        title: 'Regions',
        regions
      })
    })
    .catch(error => {
      console.error('Error fetching countries:', error)
      res.status(500).send('An error occurred while fetching regions data')
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
