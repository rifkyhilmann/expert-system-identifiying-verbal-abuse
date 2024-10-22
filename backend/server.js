const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 1000
const db = require('./app/config/db')
const router = require('./app/router/index')

app.use(bodyParser.json());
app.use(cors());
app.use('/', router)

db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database connected');
    }
})

app.listen(port, () => {
    console.log('App listening on port ' + port);
});