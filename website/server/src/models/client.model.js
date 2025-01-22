const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
    clientName: {
        type: String,
        required: true,
    },
    clientLocation: {
        type: String,
        required: true,
    },
    clientWebsite: {
        type: String,
        required: true,
    },
    clientPhoto: {
        type: String,
        required: true,
    },
    /// these are newly added for mis nd manager
    clientAssigned: [{
        misId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users", // Reference to the 'users' collection
            required: true,
        },
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users", // Reference to the 'users' collection
            required: true,
        },
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model("Client", clientSchema);
