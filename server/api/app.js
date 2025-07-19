const express = require('express');
const app = express();
const forecastRoutes = require('./routes/forecastRoutes');

app.use(express.json());
app.use('/', forecastRoutes);

module.exports = app;
