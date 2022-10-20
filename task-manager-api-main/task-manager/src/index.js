const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
// const express = require('express')
// // const cookieParser = require('cookie-parser')
// require('./db/mongoose')
// const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')

// const app = express()
// const port = process.env.PORT

// app.use(express.static('public'))
// app.use(express.json())
// app.use(userRouter)
// app.use(taskRouter)

 
// // app.use(express.static('public'))
// // app.use(express.json())
// // app.use(express.urlencoded({ extended: false }))
// // app.use(cookieParser())

// app.listen(port, () => {
//     console.log('Server is up on port ' + port)
// })



// /*-----------*/

// var CryptoJS = require("crypto-js");

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// console.log("ciphertext::"+ciphertext)
// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log("originalText::"+ originalText);
