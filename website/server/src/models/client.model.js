const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
    clientName: {
        type: String,
        required: true,
    },
    clientLocation:{
        type:String,
        required: true,
    },
    clientWebsite:{
        type:String,
        required:true
    },
    clientPhoto: {
        type: String,
        required: true,
    },
})

module.exports= mongoose.model("Client",clientSchema);