const mongoose = require("mongoose");
const ledgerModel = require("./ledger.model");


const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Account must be associated with a user"],
        index: true,
    },
    status: {
        type: String,
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
accountSchema.index({ user: 1, status: 1})

accountSchema.methods.getBalance = async function(){
    const getBalance = await ledgerModel.aggregate([
        { $match: { account: this._id}},
        {
            $group:{
                _id: null,
                totalDebit: {
                    $sum:{
                        $cond:[
                            {$eq: ["$type", "DEBIT"]},
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredit: {
                    $sum:{
                        $cond:[
                            {$eq: ["$type", "CREDIT"]},
                            "$amount",
                            0
                        ]
                    }
                },
                $project: {
                    _id: 0,
                    balance: { $subtract: ["$totalCredit", "$totalDebit"] },
                }
            }
        }
    ])

    if(getBalance.length == 0) {
        return 0;
    }
    return getBalance[0].balance;
}

const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;
