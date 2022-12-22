console.log("client side App JS File");

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{

//                  response.json().then((data)=>{

//                     console.log(data)
//                  })

// })

// fetch('http://localhost:3000/weather?address=1600 Pennsylvania Ave NW, Washington DC').then((response) => {
  
//     response.json().then((data) => {

//             if (data.error) {
//                 console.log(data.error)
//             } else {
//                 console.log(data.label)
//                 console.log(data.latitude)
//                 console.log(data.longitude)
//                 console.log(data.postal_code)
//                 console.log(data.forecast)
//             }

//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const messageThree = document.getElementById('message-3')
const messageFour = document.getElementById('message-4')
const messageFive = document.getElementById('message-5')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    messageOne.textContent= 'Data is being fetched'
    messageTwo.textContent= ''
    messageThree.textContent= ''
    messageFour.textContent= ''
    messageFive.textContent= ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        
            response.json().then((data) => {

                    if (data.error) {
                        console.log(data.error)
                        messageOne.textContent= data.error
                    } else {
                        console.log(data.label)
                        console.log(data.latitude)
                        console.log(data.longitude)
                        console.log(data.postal_code)
                        console.log(data.forecast)

                        messageOne.textContent= data.label
                        messageTwo.textContent= data.latitude
                        messageThree.textContent= data.longitude
                        messageFour.textContent= data.postal_code
                        messageFive.textContent= data.forecast
                    }

                })
    })
})