const express = require('express');
const app = express();
const cors = require('cors');
const forecastRoutes = require('./routes/forecastRoutes');

app.use(cors());
app.use(express.json());
app.use('/', forecastRoutes);

module.exports = app;
