// client-side javascript

/// select the DOM elements
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() /// prevent the browser from refreshing on form submission

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    /// fetch the weather forecast by given location
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) 
                return msg1.textContent = data.error
            msg1.textContent = data.location
            msg2.textContent = data.weather
        })
    })

})