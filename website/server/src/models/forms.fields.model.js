const mongoose = require("mongoose");
const { Schema } = mongoose;

const FormFieldItemSchema = new Schema({
    uniqueId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});


const FormFieldTableSchema = new Schema({
    uniqueId: {
        type: String,
        required: true,
    },
    rows: {
        type: Number,
        required: true,
    },
    cols: {
        type: Number,
        required: true,
    },
    columnHeaders :{
        type:[String],
        required: true,
    },
});

// Define the main schema
const FormFieldSchema = new Schema({
    campaignId: {
        type: Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true,
    },
    formFields: {
        type: [FormFieldItemSchema],
        required: true,
    },

    tableFields:{
        type:[FormFieldTableSchema]
    },

    collectionName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("FormField", FormFieldSchema);