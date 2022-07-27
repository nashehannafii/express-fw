const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, findContact} = require('./utils/contacts')

const morgan = require('morgan')
const app = express()
const port = 3000
// const ejs = require('ejs')

// EJS
app.set('view engine', 'ejs')
//third party middleware
app.use(morgan('dev'))
app.use(expressLayouts)

// build in middleware
app.use(express.static('public'))

// application level middleware

app.use( (req, res, next) => {
    console.log('Time : ',Date.now())
    next()
})

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Rizki',
            email: 'rizki@gmail.com'
        },
        {
            nama: 'Imam',
            email: 'imam@gmail.com',
        },
        {
            nama: 'Wahid',
            email: 'wahid@gmail.com'
        },
        {
            nama: 'Zaim',
            email: 'zaim@gmail.com'
        }
    ]
    res.render('index', {
        layout: 'layouts/main-layout',
        nama : 'Nasheh Annafii',
        title: 'Home',
        mahasiswa
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        // nama : 'Nasheh Annafii',
        title: 'About'
    })
})

app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.render('contact', {
        layout: 'layouts/main-layout',
        // nama : 'Nasheh Annafii',
        title: 'Contact',
        contacts
    })
})

app.get('/contact/:name', (req, res) => {
    const contact = findContact(req.params.name)

    res.render('detail', {
        layout: 'layouts/main-layout',
        // nama : 'Nasheh Annafii',
        title: 'Detail',
        contact
    })
})

// app.get('/product/:id', (req, res) => {
//     res.send(`Product id : ${req.params.id} <br> Category : ${req.query.category}`)
// })

app.use('/',(req, res) => {
    res.status(404).render('404', {
        layout: '404',
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
