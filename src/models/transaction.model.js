const moongose = require('mongoose');

const transactionSchema = new moongose.Schema({
    fromAccount: {
        type: moongose.Schema.Types.ObjectId,
        ref: "accounts",
        required: [true, "Transaction must be associated with a from account"],
        index: true,
    },
    toAccount: {
        type: moongose.Schema.Types.ObjectId,
        ref: "accounts",
        required: [true, "Transaction must be associated with a to account"],
        index: true,
    },
    amount: {
        type: Number,
        required: [true, "Transaction must have an amount"],
        min: [0, "Transaction amount must be positive"],
    },
    status: {
        type:String,
        enum: {
            values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
            message: "Status can be either PENDING, FAILED, COMPLETED OR REVERSED"
        },
        default: "PENDING"
    }
})   