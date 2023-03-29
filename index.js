const express=require('express')
const mongoose=require('mongoose')
// const multer = require('multer')
const dotenv = require("dotenv");

dotenv.config();
// const path = require('path')
const app = express();

var cors = require('cors')
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))





app.use("/user", require("./routes/user"));





mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://admin:Sunny2798@sunnyapi.kndypoa.mongodb.net/Resort-API?retryWrites=true&w=majority')
.then(() =>{
    console.log('connected to MongoDB')
    app.listen(3000,()=>{
        console.log('Node api is running on port 3000')
    })
}).catch((error) =>{
    console.log(error)
})