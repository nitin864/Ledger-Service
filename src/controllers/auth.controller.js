const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

/// - user registr controller
/// - POST, /api/auth/register   note by nitin (maintainer)
async function registerUserController(req, res){

    try {

       const {email , password, name} =req.body;

       const isExist = await userModel.findOne({
        email: email
       })
       if(isExist){
        return res.status(422).json({
            message: "User already exist with this email",
            status: "failed"
        })
       }

       const user = await userModel.create({
        email,
        name,
        password
       })

       const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"})

       res.cookie("token", token)

       res.status(201).json({
        message: "new user created successfully",
        user: user
       })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = {registerUserController}