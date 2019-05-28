const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express() /// create an Express application
const port = process.env.PORT || 3000; /// get port environment var provided by Heroku or use 3000 for local deployment

/// define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') /// set up a custom dir for Express views
const partialsPath = path.join(__dirname, '../templates/partials') /// set up a custom dir for Express partials

/// set up handlebars with Express
app.set('view engine', 'hbs')
app.set('views', viewsPath) /// set up a custom dir for Express views
hbs.registerPartials(partialsPath)

/// set up static directory to serve
app.use(express.static(publicDirPath))

/// set up the route for app.com
app.get('', (req, res) => {
    /// pass name of the template with extension ignored,
    /// second arg is the obj for view to access
    res.render('index', {
        title: 'Weather App',
        author: 'Wenhao Ruan'
    }) 
})

/// app.com/about
app.get('/about', (req, res) => {
    /// pass name of the template with extension ignored,
    /// second arg is the obj for view to access
    res.render('about', {
        title: 'About Me',
        author: 'Wenhao Ruan'
    })
})

/// app.com/help
app.get('/help', (req, res) => {
    /// pass name of the template with extension ignored,
    /// second arg is the obj for view to access
    res.render('help', {
        title: 'Help',
        helpText: 'This is some useful information.',
        author: 'Wenhao Ruan'
    })
})

/// app.com/weather
app.get('/weather', (req, res) => {
    /// address key must be provided
    if (!req.query.address) {
        return res.send({
            error: 'Location must be provided in the query string!'
        })
    }

    /// search for geolocation with provided address key
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        /// query the forecast for the given location
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                weather: forecastData
            })
        })
    })
})

/// handle unsupported requests
/// Note: Express handles request matches in a sequence they are defined
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: "Help article not found!",
        author: 'Ryan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: "Page not found!",
        author: 'Ryan'
    })
})

/// start up the server on port 3000
app.listen(port, () => {
    console.log('Server is up on port .' + port)
}) 