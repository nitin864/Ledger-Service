const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "Email already Exist"],
        lowercase : true,
        trim : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address"]

    },
    name: {
        type: String,
        require: [true, "Name required for Account Creation"]
         
    },
    password: {
        type: String,
        required: [true, "Password required for Account Creation"],
        minlength: [6, "Password should contain more than 6 characters"],
        select: false
    }},
    {
        timestamps: true
    
})

userSchema.pre("save", async function (next) {
    
    if(!this.isModified("password")){
        return next()
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;

    return next()
})

userSchema.methods.comparePassword = async function(password){
   
    return await bcrypt.compare(this.password, password)
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel