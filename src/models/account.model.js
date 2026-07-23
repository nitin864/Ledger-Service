const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Account must be associated with a user"],
    },
    status: {
        enum: ["ACTIVE", "FROZEN", "SUSPENDED"],
        default: "ACTIVE",
        message: "Status must be one of ACTIVE, FROZEN, or SUSPENDED",

    },
    currency: {
        type: String,
        required: [true, "Currency is required for account creation"],
        default: "INR",
         
    },

},{
    timestamps: true,
})

const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;
