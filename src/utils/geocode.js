const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL ="http://api.positionstack.com/v1/forward?access_key=f7f7118c7e13e222a99109c507e97c9d&query="+address+"&limit=1"

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error ) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                label :response.body.data[0].label,
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                postal_code: response.body.data[0].postal_code
            })

        
        }
    })
}

module.exports = geocode