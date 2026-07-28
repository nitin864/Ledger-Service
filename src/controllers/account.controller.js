const accountModel = require("../models/account.model");

async function createAccountController(req, res) {
    try {
        const user = req.user;

        const newAccount = await accountModel.create({
            ...req.body,
            user: user.id,
        });

        res.status(201).json(newAccount);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    createAccountController,
};