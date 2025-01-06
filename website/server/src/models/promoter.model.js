const mongoose = require("mongoose");
const { Schema } = mongoose;

const promoterSchema = new Schema({
    promoterName: {
        type: String,
        required: true,
    },
    promoterEmailId:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    campaignId: {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
    },
    forms: [{
        type: Schema.Types.ObjectId,
        ref: "Form",
    }],
});

module.exports = mongoose.model("Promoter", promoterSchema);