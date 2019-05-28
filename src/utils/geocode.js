const request = require('request')

const geoCode = (address, callback) => {
    // encode url and concatenate on the string, ? becomes %3F
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?' +
        'access_token=pk.eyJ1Ijoid3I2ODk5OTUiLCJhIjoiY2p2bW9xMGd1MWZmNjQ1b2kwdDhyc2RzNSJ9.BnzXCK1oYXPkttOFy7zbPg' + 
        '&limit=1'

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode