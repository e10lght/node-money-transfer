const express = require('express')
const app = express()

const router = require('./routes/router')

app.use(express.json())
app.use('/transfer', router)

app.listen(3008)
