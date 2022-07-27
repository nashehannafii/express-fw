const fs = require('fs')

const dirPath = './data'
const dataPath = `${dirPath}/contact.json`

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]')
}

//ambil semua contact di contact.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync(dataPath, 'utf-8')
    const datas = JSON.parse(fileBuffer)
    return datas
}

// cari contact berdasarkan nama
const findContact = (name) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase())
    return contact
}

module.exports = { loadContact, findContact }