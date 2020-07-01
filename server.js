const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const path = require('path');
const api = require('./server/routes/api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "./src/model")))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

app.use('/', api)

const port = 3200
app.listen(port, function () {
  console.log(`Server's UP, on port ${port}`)
})