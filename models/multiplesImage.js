const mongoose = require('mongoose')

const multiplesImageSchema = mongoose.Schema(
    {
        images:{
            data:Buffer,
            contentType:String
        },
    },
    
)

const MultiplesImage = mongoose.model('MultiplesImage', multiplesImageSchema);


module.exports = MultiplesImage ;