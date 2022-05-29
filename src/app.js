require('dotenv').config();
const express = require('express');
const app = express();
const createDefaultTables = require('./scripts/create_tables');
const EmployeeRouter = require('./router/router');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/employee',EmployeeRouter);

PORT = process.env.PORT;
app.listen(PORT,async()=>{
    await createDefaultTables();
    console.log(`Server is running on port ${PORT}`);
})
app.on("error",(error)=>console.log(` server is failed due to : ${error}`));




