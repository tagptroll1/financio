const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActice: {
        type: Date,
        default: Date.now
    },
    dataHash: {
        type: String,
        required: true
    },
    uuidHash: {
        type: String,
        required: true
    },
    dataKey: {
        type: String,
        required: true
    },
    finance: {
        type: Schema.Types.ObjectId,
        ref: "Finance"
    }
});

module.exports = mongoose.model("User", UserSchema);
