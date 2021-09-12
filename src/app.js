const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const app = express()
const constants = require('../constants')

const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
const route = express.Router()
app.use(cors())

const port = process.env.PORT || 5000

app.use('/v1', route)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: constants.USER,
    pass: constants.PASS,
  },
})

console.log(constants)
route.post('/text-mail', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  const { from, subject, text } = req.body
  const mailData = {
    from: from,
    to: 'drjaat1998@gmail.com',
    subject: subject,
    text: text,
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
  }

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error)
    }
    res.status(200).send({ message: 'Mail send', message_id: info.messageId })
  })
})
