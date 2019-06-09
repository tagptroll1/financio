const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseFractionSchema = new Schema({
    category: String,
    total: Number,
    subExpenses: Object,
});

module.exports = mongoose.model("ExpenseFraction", ExpenseFractionSchema);

