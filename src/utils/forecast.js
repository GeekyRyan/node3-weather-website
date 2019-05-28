const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9a3bd78e397902a9c385b75bb163fded/' + latitude +
        ',' + longitude + '?units=si'

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const currently = body.currently
            callback(undefined, 'Summary: ' + currently.summary + '. Current temp is: ' +
                currently.temperature + ' . There is a ' + currently.precipProbability*100 +
                '% chance to rain.')
        }
    })
}

module.exports = forecast