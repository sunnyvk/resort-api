const express=require('express')
const mongoose=require('mongoose')
const multer = require('multer')
const path = require('path')
const app = express();
var cors = require('cors')
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


const ImageModel=require('./models/imageModel')
const multiplesImageSchema=require('./models/imageModel');
const MultiplesImage = require('./models/multiplesImage');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')



const storagem = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'multipleUploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})



const multiplesImage = multer({
    storage: storagem,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).array("imagesm" , 10)




app.post('/bulk' ,async(req,res)=>{
    multiplesImage(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImages= new MultiplesImage({
                images:{
                    data:req.files.filename,
                    contentType:'image/png'
                },
            });
            newImages
                .save()
                .then(() => res.send("succesful uploaded"))
                .catch(err=> console.log(err));
        }
    });
 });


// routers
// const router = require('./routes/productRouter.js')
// app.use('/api/products', router)

//static Images Folder

// app.use('/Images', express.static('./Images'))

app.post('/upload',async(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage= new ImageModel({
                images:{
                    data:req.file.filename,
                    contentType:'image/png'
                },
                price:req.body.price,
                name:req.body.name,
                location:req.body.location,
                price_per_month:req.body.price_per_month,
                price_per_week:req.body.price_per_week,
                no_of_bedroom:req.body.no_of_bedroom,
                no_of_bathroom:req.body.no_of_bathroom
            });
            newImage
                .save()
                .then(() => res.send("succesful uploaded"))
                .catch(err=> console.log(err));
        }
    });
 });


// app.post('/upload',upload,async(req,res)=>{
//     try{
//      const dailyAttendence= await DailyAttendence.create(req.body)
//      res.status(200).json(dailyAttendence);
//     }catch (error) {
//      console.log(error.message);
//      res.status(500).json({message:error.message})
//     }
//  })

//to get a daily attendence
// app.get('/dailyattendence',async(req,res)=>{
//     try{
//         const dailyAttendence = await DailyAttendence.find({});
//         res.status(200).json(dailyAttendence);
//     }catch(error){
//         res.status(500).json({message:error.message})
//     }
// })



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