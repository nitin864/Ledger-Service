const moongose = require('mongoose');

const ledgerSchema = new mongoose.Schema({

    account : {
        type: moongose.Schema.Types.ObjectId,
        ref: "accounts",
        required : [true, "Ledger must be associated with an account"],
        index: true,
        immutable: true
    }
 
})
