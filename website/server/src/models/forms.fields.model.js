const mongoose = require("mongoose");
const { Schema } = mongoose;

const FormFieldItemSchema = new Schema({
    uniqueId: {
        type: String,
    },
    title: {
        type: String,
    },
    type: {
        type: String,
    },
    options: {
        type: Map,
        of: [Map],
    }
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
    columnHeaders: {
        type: [String],
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

    tableFields: {
        type: [FormFieldTableSchema]
    },

    collectionName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("FormField", FormFieldSchema);