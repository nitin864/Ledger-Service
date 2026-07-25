const accountModel = require('../models/account.model')

async function creeateAccountController(req, res) {
    try {
        const user  = req.user;
        const newAccount = await accountModel.createAccount({ ...req.body, userId: user.id });
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create account' });
    }
}

module.exports = {
    creeateAccountController
};