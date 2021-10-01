const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
    },
    imageUrl:String,
    contact:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:Number,
    address:{
        type:String,
        trim:true,
    }

},
{ timestamps: true }
)

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password;

    return userObject
}


userSchema.statics.getAllUsers = async () =>{
    const flats = await User.find();
    return flats;
}

userSchema.statics.getUser = async (id) =>{
    const user = await User.findById(id);
    return user;
}

const User = mongoose.model('Users',userSchema);

module.exports = User;