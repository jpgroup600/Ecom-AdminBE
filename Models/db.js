const mongoose = require ('mongoose');
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>{
    console.log('MongoDD Connected Sucesfully...');
}).catch((err)=>{
    console.log('MongoDb Connection Error :',err)
})