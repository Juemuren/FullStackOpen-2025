const dotenv = require('dotenv')
const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(`Usage:
    ${process.argv[0]} ${process.argv[1]} <password> <name> <number>
    ${process.argv[0]} ${process.argv[1]} <password>`
  )
  process.exit(1)
}

dotenv.config()

const password = process.argv[2]
const username = process.env.DATEBASE_USERNAME
const cluster = process.env.DATEBASE_CLUSTER
const appname = process.env.DATEBASE_APPNAME

const url =
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/phonebook?retryWrites=true&w=majority&appName=${appname}`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
}

else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}