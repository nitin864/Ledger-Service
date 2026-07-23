const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const user  = require('../models/user.model')
const emailService = require('../services/email.service')


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

       await emailService.sendEmailWithAttachment(email, name)
        
    } catch (err){
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

/// - user login controller
/// - POST, /api/auth/login

async function loginUserController(req,res){

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message: "invalid user or password"
        })
    }

    const isPassValid = await user.comparePassword(password)

    if(!isPassValid){
        return res.status(422).json({
            message: "User already exist with this email",
            status: "failed"
        })
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"})

       res.cookie("token", token)

       res.status(200).json({
        message: `sign in successfully as ${user.name}`,
        user: user
       })
}

module.exports = {registerUserController, loginUserController}