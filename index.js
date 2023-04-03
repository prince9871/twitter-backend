const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/route')

const app = express()
app.use(express.json())

// Database connection
mongoose.connect("mongodb+srv://prince9871:BZjeaWxY1uTLCefz@cluster0.pelsn1m.mongodb.net/twitter", {
    useNewUrlParser: true,
})
    .then(() => (console.log('MongoDB Connected')))
    .catch((err) => (console.log(err)))

// Middleware
app.use('/', routes);

// Start the server
app.listen(process.env.port || 3000, () => console.log('Server started on port 3000'));
