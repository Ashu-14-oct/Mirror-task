require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoConnection = require("./config/mongoose");
const PORT = process.env.PORT || 3000;
const server = express();

//middlewares
server.use(cors());
server.use(express.json());

//routing
server.use('/', require('./routes/routes'));

//listening
server.listen(PORT, (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`server running on PORT ${PORT}`);
});