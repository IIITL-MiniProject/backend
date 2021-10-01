const express = require('express');
const app = express();
require('./db/connect');
const port = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(port,()=>console.log("server is running on port "+port));