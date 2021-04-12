const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const URL = 'http://api.weatherstack.com/current?access_key=8f6fcd03931931c0cd11d4d58323c2a7&query='+latitude+','+longitude+'&units=f'
    request({url: URL , json: true}, (error,response) => {
        if(error){
            callback('Unable to connect to weather services',undefined)
        }    
        else if(response.body.error) {
            callback('Unable to find location',undefined)
        }
        else { 
            callback(undefined,`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees but it feels like ${response.body.current.feelslike} degrees outside. The unit is Farhenheit.`)
        }
    })
}

module.exports = forecast