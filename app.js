const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
// const ejs = require('ejs')

// EJS
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)

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
        nama : 'Nasheh Annafii',
        title: 'Home'
    })
})

app.get('/product/:id', (req, res) => {
    res.send(`Product id : ${req.params.id} <br> Category : ${req.query.category}`)
})

app.use('/', (req, res) => {
    res.status(404).send('404 Not Found')
    res.send('404 Not Found')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
