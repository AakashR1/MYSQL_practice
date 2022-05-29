const mysql = require('mysql');
const dotEnv = require('dotenv').config();
const env = dotEnv['parsed']['NODE_ENV'] || 'development';
const config = require('../config/config.json')[env];

var db = mysql.createConnection(config);

const connectDB = async ()=>{
    db.connect(function (err) {
        if (err)
            throw err;
        console.log("Connected!");
    });
}
connectDB();
module.exports ={ 
    db
};