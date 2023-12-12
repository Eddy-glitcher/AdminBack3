const { Schema, model } = require('mongoose');

const HospitalSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'Users', 
        required : true
    }
}, { collection : 'Hospitals'});

HospitalSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.hid = _id;
    return object;
});

module.exports = model('Hospitals', HospitalSchema);