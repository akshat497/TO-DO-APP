const connection = require('./utils/db');
const express = require('express');
const cors=require('cors');
const config = require('./config/config');
const app=express()


app.use(express.json())
app.use(cors())
var port=config.PORT
connection()
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port,()=>{
    console.log(`listining at port number ${port}`)
})