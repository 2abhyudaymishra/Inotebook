const connectToMongo= require ('./db');
connectToMongo();
const express = require('express')
const cors= require('cors')
const app = express()
const port = 5000
app.use(cors());

//now we can deal  in json type (it is a middle-ware)
app.use(express.json());
//available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,()=>{
    console.log(`INoteBook backend is listening at http//localhost:${port}`);
})