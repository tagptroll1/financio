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
    joinedDate: {
        type: Date,
        default: Date.now
    },
    lastActice: {
        type: Date,
        default: Date.now
    },
    finance: {
        type: Schema.Types.ObjectId,
        ref: "Finance"
    }
});

module.exports = mongoose.model("User", UserSchema);
