const moongose = require('mongoose');

const ledgerSchema = new mongoose.Schema({

    account : {
        type: moongose.Schema.Types.ObjectId,
        ref: "accounts",
        required : [true, "Ledger must be associated with an account"],
        index: true,
        immutable: true
    },
    amount :{
        type: Number,
        required : [true, "Amount is required for ledger entry"],
        immutable: true
    },
    transaction: {
        type: moongose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [true, "Ledger must be associated with a transaction"],
        index: true,
        immutable: true
    },
    type: {
        type: String,
        enum: {
            values: ["CREDIT", "DEBIT"],
            message: "Type can be either CREDIT or DEBIT"
        },
        required: [true, "Ledger entry must have a type"],
        immutable: true
    }
},{
    timestamps: true    
})

function preventLedgerModification(next) {
    throw new Error("Ledger entries cannot be modified or deleted.");
}

ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("updateOne", preventLedgerModification);   
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);

const ledgerModel = moongose.model("ledger", ledgerSchema)

module.exports = ledgerModel