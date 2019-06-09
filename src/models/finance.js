const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    hash: {
        type: String,
        required: true,
    },
    totalIncome: {
        type: Number,
        default: 0,
    },
    totalExpenses: {
        type: Number,
        default: 0,
    },
    data: [{ 
        type: Schema.Types.ObjectId, 
        ref: "ExpenseFraction",
    }]
});

module.exports = mongoose.model("Finance", FinanceSchema);
