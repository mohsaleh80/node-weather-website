const express =require('express');// npm
const path = require('path') // npm
const hbs = require('hbs') // npm
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))
const app = express()
const port = 3000

const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//loading Handelbar hbs
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set public bar (static)
app.use(express.static(publicPath))

// Views template rendring (Dynamic)
 app.get('/', (req, res) => {
  res.render('index',{
               title: 'Weather App',
               server:"Express",
               description : 'using dynamic views',
               name: 'Moh Saleh'

  })
})

 app.get('/help', (req, res) => {
    res.render('help',{
       title: 'help page',
        phone : "000987655",
        email: "abc@gmail.com",
        resource:"Help Center",
        name: 'Moh Saleh'
    })
  })


app.get('/about', (req, res) => {
    res.render('about',{
        title: 'about page',
        topic : "Express",
        server: "Node JS",
        language:"JS",
        application :"Weather App",
        name: 'Moh Saleh'

    })
  })


  
app.get('/weather', (req, res) => {

          if (! req.query.address) {
            
            res.send({
              error : 'You have to provide an address ...'
            })

          } else {
              //'1600 Pennsylvania Ave NW, Washington DC'
           // geocode(req.query.address, (error, geodata) => {
            geocode(req.query.address, (error, {label,latitude,longitude,postal_code}={}) => {
              //console.log('Error', error)
              if(error){ 
                return res.send({error})
              }
          
             // forcast(geodata.latitude, geodata.longitude, (error, forcastdata) => {
              forcast(latitude, longitude, (error, forecastdata) => {
                //  console.log('Error', error)
                 // console.log('Data', geodata)
                //  console.log('Data', forcastdata)
                  if(error){ 
                    return res.send({error})
                  }

                      res.send({
                        address : req.query.address,
                        //geodata: geodata,
                        label : label,
                        latitude:latitude,
                        longitude : longitude,
                        postal_code:postal_code,
                        forecast : forecastdata
                        
                    })
              })
          })
            
              
          }


    })


app.get('/products', (req, res) => {

        if(! req.query.search){

              res.send({
              
                error : 'You have to provide a search term ...'
              })

        }
        else{

              console.log(req.query.search)
              res.send({
              
                products : []
              })

        }

    })



app.get('/help/*', (req, res) => {
      res.render('404',{ 
        errorMessage:'My cusome help page not found ...',
        name: 'Moh Saleh',
        title:'404 Page'})
    })

app.get('*', (req, res) => {
      res.render('404',{ 
        errorMessage:'My 404 Page ...',
        name: 'Moh Saleh',
        title:'404 Page'})
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})