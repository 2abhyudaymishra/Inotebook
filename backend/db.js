//to connect to db
const mongoose = require ('mongoose');
 const mongouri = "mongodb://127.0.0.1:27017/inotebook"

 const connectToMongo=()=>{
    mongoose.connect(mongouri);
 }

 module.exports= connectToMongo;