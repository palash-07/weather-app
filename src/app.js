const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express Configs
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath) 
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'John Doe'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About page',
        name: 'John Doe'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpMsg: 'This is the help message',
        title: 'Help',
        name: 'John Doe'
    })
})

app.get('/weather' , (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You have to provide an address'
        })
    }

    geocode(req.query.address, (error,data) => {
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You need to provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMsg: '404 help',
        title: '404',
        name: 'John Doe'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        errorMsg: '404',
        title: '404',
        name: 'John Doe'
    })
})

app.listen(3000, () => {
    console.log('Server is up on PORT 3000')
})