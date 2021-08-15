const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors')
const app = express()
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
const route = express.Router()

const port = process.env.PORT || 5000

app.use('/v1', route)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'drjaat1998@gmail.com',
    pass: 'Drjaat@1998',
  },
})

route.post('/text-mail', (req, res) => {
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
