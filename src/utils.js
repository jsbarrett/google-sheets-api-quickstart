const fs = require('fs')
const readline = require('readline')

const readFile = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, content) => {
    if (err) return reject(err)
    resolve(content)
  })
})

const prompt = (str) => new Promise((resolve, _reject) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question(str, response => {
    resolve(response)
    rl.close()
  })
})

const writeFile = ({ path, content }) => new Promise((resolve, reject) => {
  fs.writeFile(path, content, err => {
    if (err) return reject(err)
    resolve()
  })
})


module.exports = {
  prompt,
  readFile,
  writeFile
}
