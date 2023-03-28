const mongoose = require('mongoose')

const imageModelSchema = mongoose.Schema(
    {
        images:{

            contentType:String
        },
        price:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        location:{
            type: String,
            required:true
        },
        price_per_month:{
            type: String,
            required:true
        },
        price_per_week:{
            type: String,
            required:true
        },
        no_of_bedroom:{
            type: String,
            required:true
        },
        no_of_bathroom:{
            type: String,
            required:true
        },
      
       

    },
    
)

const ImageModel = mongoose.model('ImageModel ', imageModelSchema);


module.exports = ImageModel ;