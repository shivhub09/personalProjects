const mongoose = require("mongoose");
const {Schema} = mongoose;

const campaignSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    campaignLogo:{
        type:String,
        required:true
    },
    clientId:{
        type:Schema.Types.ObjectId,
        ref:"Client"
    },
    listOfMis:{
        type:[Schema.Types.ObjectId],
        ref:"User",
        default:[],
    },
    listOfManagers:{
        type:[Schema.Types.ObjectId],
        ref:"User",
        default:[],
    }
},{timestamps:true});

module.exports = mongoose.model("Campaign", campaignSchema);