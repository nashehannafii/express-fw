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

const removeContact = (name) => {
    const data = loadContact()
    const contact = data.find(
        (contact) => contact.name === name
    )
    const index = data.indexOf(contact)
    data.splice(index, 1)
    fs.writeFileSync(dataPath, JSON.stringify(data))
    console.log(`Contact ${name} berhasil dihapus`)
}

const addContact = (name, phone, email) => {
    const contacts = loadContact()
    const contact = {
        name,
        phone,
        email
    }
    contacts.push(contact)
    fs.writeFileSync(dataPath, JSON.stringify(contacts))
    return contact
}
 
const cekDuplikat = (name) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.name === name)  
}

const editContact = (oldName, name, phone, email) => {
    const data = loadContact()

    console.log(data)
    const contact = data.find(
        (contact) => contact.name === oldName
    )
    
    const index = data.indexOf(contact)
    data.splice(index, 1)
    
    const updateData = {
        name,
        phone,
        email
    }
    console.log(data)
    console.log(updateData)
    delete data.oldName
    data.push(updateData)
    fs.writeFileSync(dataPath, JSON.stringify(updateData))
    return updateData
}

module.exports = { loadContact, findContact, addContact, removeContact, cekDuplikat, editContact }