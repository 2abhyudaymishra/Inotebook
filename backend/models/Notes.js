const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    user:{
        //this will store user id from the user table in mongodb
        type : mongoose.Schema.Types.ObjectId,
        ref:'user'

    },
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true,
    },
    tag:{
        type: String,
        default : "General"
    },
    date:{
        type : Date,
        default : Date.now
    },
  });
  const Notes =mongoose.model('note',notesSchema)
  module.exports=Notes;