const fs = require('fs')

const dirPath = './data'
const dataPath = `${dirPath}/contact.json`

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]')
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync(dataPath, 'utf-8')
    const datas = JSON.parse(fileBuffer)
    return datas
}

module.exports = { loadContact }