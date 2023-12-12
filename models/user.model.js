const { Schema, model } = require('mongoose');

const UserSchema =  new Schema({
    name : {
        type     : String,
        required : true 
    },
    email : {
        type     : String,
        unique   : true, 
        required : true 
    },
    password : {
        type     : String,
        required : true 
    },
    image : {
        type : String 
    },
    role : {
        type    : String,
        default : 'USER_ROLE'
    }
});

UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...user} = this.toObject();
    user.uid = _id;
    return user;
});

module.exports = model('Users', UserSchema);