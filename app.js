const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const { loadContact, findContact, addContact, removeContact, cekDuplikat } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')


const morgan = require('morgan')
const app = express()
const port = 3000

// kofigure app

app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(expressLayouts)


app.use((req, res, next) => {
    console.log('Time : ', Date.now())
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
        nama: 'Nasheh Annafii',
        title: 'Home',
        mahasiswa
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'About'
    })
})

app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Contact',
        contacts,
        msg: req.flash('msg')
    })
})

app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Add Contact',
    })
})

//input data contact

app.post('/contact', [
    body('name').custom((value) => {
        const duplikat = cekDuplikat(value)
        if (duplikat) {
            throw new Error('Nama contact sudah digunakan')
        }
        return true
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('phone', 'Nomor HP tidak valid').isMobilePhone('id-ID')
]
    , (req, res) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.render('add-contact', {
                layout: 'layouts/main-layout',
                title: 'Add Contact',
                error: error.array()
            })
        } else {
            addContact(req.body.name, req.body.phone, req.body.email)
        }
        req.flash('msg', 'Contact berhasil ditambahkan')
        res.redirect('/contact')
    })

app.get('/contact/:name/', (req, res) => {
    const contact = findContact(req.params.name)
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Detail',
        contact
    })
})

app.get('/contact/delete/:name', (req, res) => {
    const contact = findContact(req.params.name)

    if (!contact) {
        res.status(404).send('Contact not found')
    } else {
        removeContact(req.params.name)
        req.flash('msg', 'Contact berhasil dihapus')
        res.redirect('/contact')
    }
})

app.get('/contact/edit/:name', (req, res) => {
    const contact = findContact(req.params.name)
    res.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Add Contact',
        contact
    })
})

app.post('/contact/edit', [
    body('name').custom((value, {req}) => {
        const duplikat = cekDuplikat(value)
        if (value !==  duplikat) {
            throw new Error('Nama contact sudah digunakan')
        }
        return true
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('phone', 'Nomor HP tidak valid').isMobilePhone('id-ID')
]
    , (req, res) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.render('edit-contact', {
                layout: 'layouts/main-layout',
                title: 'Edit Contact',
                error: error.array(),
                contact: req.body
            })
        } else {
            // addContact(req.body.name, req.body.phone, req.body.email)
        }
        // req.flash('msg', 'Contact berhasil ditambahkan')
        // res.redirect('/contact')
    })


// app.get('/product/:id', (req, res) => {
//     res.send(`Product id : ${req.params.id} <br> Category : ${req.query.category}`)
// })

app.use('/', (req, res) => {
    res.status(404).render('404', {
        layout: '404',
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
