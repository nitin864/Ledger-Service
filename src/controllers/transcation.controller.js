const transactionModel = require('../models/transaction.model')
const ledgerModel = require('../models/ledger.model')
const accountModel = require('../models/account.model')
const mongoose = require('mongoose')

async function  createTransactionController(){

    //validateing the request body
    const {fromAccount , toAccount, amount, idempotencyKey} = req.body;

    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({
            message: "fromAccount, toAccount, amount and idempotencyKey are required fields"
          })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    })

    const toUserAccount = await accountModel.findOne({
        _id: toUserAccount,
    })

    if(!fromAccount || !toUserAccount){
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount"
        })
    }

    //validating idempotencyKey 

    const isTransactionExist = await transactionModel.findOne({
        idempotencyKey = idempotencyKey
    })

    if(isTransactionExist){
       if(isTransactionExist.status == "COMPLETED"){
        return res.status(200).json({
            message: "Transaction already processed",
            transaction : isTransactionExist
        })
         
       }

       if(isTransactionExist.status == "PENDING"){
        return res.status(200).json({
            message: "Transaction is still in process"
        })
       }

       if(isTransactionExist.status == "FAILED"){
        return res.status(200).json({
            message: "Transaction is failed, please retry"
        })
       }
    }


}