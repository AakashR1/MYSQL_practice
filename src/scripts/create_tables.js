let {db} = require('../DB/Conn.js');
const fs = require('fs').promises;
const path = require('path');
const queryFilePath = path.join(process.cwd(),'src/sql/createTables.sql');

    
    
const createDefaultTables = async()=>{
    try {
        
        const sqlQuery  = await fs.readFile(queryFilePath,'utf-8',(err,result)=>{
            return result
        })
        // console.log(String(sqlQuery));
       await db.query(String(sqlQuery));
       console.log('Default tables are created succesfully');
    } catch (error) {
        console.log(error);   
        console.log('Default tables are not created');
    }
}

module.exports = createDefaultTables;


// "host":"localhost",
// "user":"root",
// "database":"XYZCompanyDataBase",
// "password":"",
// "multipleStatements": true