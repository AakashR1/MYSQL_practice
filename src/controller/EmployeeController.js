const { NULL } = require('mysql/lib/protocol/constants/types');
const { db } = require('../DB/Conn.js');
const util = require('util');
const fs = require('fs');
const querys = util.promisify(db.query).bind(db);
const path = require('path');
const { assert } = require('console');
const queryFilePath = path.join(process.cwd(),'src/sql/dataAddQuery.sql');
const addEmployee =async (req, res) => {
    try {
        const { emp_id, first_name, last_name, birthday, gender, salary, email, password, data_of_joining, super_id, branch_id } = req.body
        const query = `INSERT INTO employee VALUES ("${emp_id}","${first_name}","${last_name}","${birthday}","${gender}","${salary}","${email}","${password}","${data_of_joining}",${super_id || null},${branch_id || null})`
        await querys(query);
        res.send('Inserted succussfully......')
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}

const addAllDataInDB =async () => {
    try {
        const addDataQuerys = fs.readFileSync(queryFilePath,'utf-8');
        console.log(addDataQuerys);
        await querys(addDataQuerys);
        console.log('All data is added successfully...');
    } catch (error) {
        console.log(error);
    }
}

// addAllDataInDB();

const getAllEmployee = async (req, res) => {
    try {
        const query = `SELECT * FROM employee`
        const result  = await querys(query);
        res.send(result)
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}

const getAllEmployeeOrderBysalary = async (req, res) => {
    try {
        let ordertype ;
        if(req.params.ordertype == "decending"){
            ordertype = "DESC"
        }
        else{
            ordertype = "ASC"
        }
        const query = `SELECT * FROM employee ORDER BY salary ${ordertype}`
        const result  = await querys(query);
        res.send(result)
    } catch (error) {
        res.send(error)
     
    }
}

const getEmployeeOrderByGenderAndName = async(req,res)=>{
    try {
        const query = `SELECT * FROM employee ORDER BY gender, first_name, last_name`
        const result  = await querys(query);
        res.send(result)
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}

const getNumberOfEmplyee = async(req,res)=>{
    try {
        const query = `SELECT COUNT(emp_id) FROM employee`
        const result  = await querys(query);
        res.send(result)
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}

const EmpAreOldThen = async(req,res)=>{
    try {

        let date= new Date()
        date = `${date.getFullYear()-req.params.age}-${date.getMonth()}-${date.getDate()}`;
        const query = `SELECT COUNT(emp_id) FROM employee WHERE birthday < '${date}'`
        const result  = await querys(query);
        res.send(result)
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}

const getAvgsalary = async (req,res)=>{
    try {
        const query = `SELECT AVG(salary) FROM employee`
        const result  = await querys(query);
        res.send(result)
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}

const getHowManyBranchWithEmployee = async(req,res)=>{
    try {
        const query = `SELECT DISTINCT branch_id FROM employee `
        const result  = await querys(query);
        res.send(result)
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}

const TotalSalaryCompanyPaying = async(req,res)=>{
    try {
        const query = `SELECT SUM(salary) FROM employee `
        const result  = await querys(query);
        res.send(result)
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}

const employeeInEachBranch = async(req,res)=>{
    try {
        const query = `SELECT COUNT(gender), branch_id FROM employee GROUP BY branch_id `
        const result  = await querys(query);
        res.send(result)
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}


const addBranch =async (req, res) => {
    try {
        const { branch_id , branch_name, mngr_id, mngr_start_date } = req.body
        const query = `INSERT INTO branch VALUES ("${branch_id }","${branch_name}","${mngr_id}","${mngr_start_date}")`
        await querys(query);
        res.send('Inserted succussfully......')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

const updateEmployeeTable = async (req, res) => {
    try {

        let queryString = [];
        Object.entries(req.body).forEach((element) => {
            if (element[1] !== "") {
                queryString.push(` ${element[0]} = "${element[1]}" `);
            }
        })

        const query = `UPDATE employee SET ${String(queryString)} WHERE emp_id = ${req.params.EmployeeId}`
    
        await querys(query);
                  
        res.send('Updated succussfully......');
                
    } catch (error) {
        console.log(error);
        res.send('operation can not be perform.......')
    }
}


const addBranchSuppier =async (req,res)=>{
    try {
        const { branch_id, supplier_name, supply_type} = req.body
        const query =`INSERT INTO branch_supplier VALUES ('${branch_id}','${supplier_name}','${supply_type}')`
        await querys(query);
        res.send('Inserted succussfully......')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

const addClient =async (req,res)=>{
    try {
        const { client_id, client_name, branch_id} = req.body
        const query =`INSERT INTO client VALUES ('${client_id}','${client_name}','${branch_id}')`
        await querys(query);
        res.send('Inserted succussfully......')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

const getAllClient = async (req, res) => {
    try {
        const query = `SELECT * FROM employee`
        const result  = await querys(query);
        res.send(result)
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}


const addWorks_with =async (req,res)=>{
    try {
        const { emp_id, client_id, total_sales} = req.body
        const query =`INSERT INTO work_with VALUES ('${emp_id}','${client_id}','${total_sales}')`
        await querys(query);
        res.send('Inserted succussfully......')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

const totalSalesOfEachSalesman = async(req,res)=>{
    try {
        
        const query = ` SELECT SUM(Total_sales),emp_id FROM work_with GROUP BY emp_id`
        const result = await querys(query)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}


// Wildcards
   //% = any number characters(any number of charaecter befor of after this), _ = one character
        //%in between this is show dose this include%
const FindClientWhoArekeyWord = async (req,res)=>{
    try {
     
        const query = `SELECT * FROM Client WHERE client_name LIKE "% ${req.params.key} %"`;
        const result =await querys(query);
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

const empBornInSpeMonth = async (req,res)=>{
    try {
        
        const query = `SELECT * FROM employee WHERE birthday LIKE '____-${req.params.key}%'`;
        console.log(query);
        const result =await querys(query);
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

//union
//rules 1. each query in unio should have same number of fields to select and also should have same data type.
const cliNameNidNsuppNameNid = async (req,res)=>{
    try {
        const query = `SELECT client_name, branch_id FROM client UNION SELECT supplier_name, branch_id FROM branch_supplier`;
        const result = await querys(query);
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

//joins
//find the all braches and the name of the managers
// thier is mainly four type of join
//1. general join/inner joins
const branchAndThierManager = async (req,res)=>{
    try {
        const query = `SELECT employee.emp_id, employee.first_name, branch.branch_name
                        FROM employee
                        JOIN branch
                        ON employee.emp_id = branch.mngr_id;`;
        const result = await querys(query);
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

//Left join(include all detail which is in left table column)(left table is that table which is connect with FROM statement ).
//Right join (include all the details which is in right table)
//full outer join (basically it is combine of right and left join. not support by mysql)
const empWithIfBranchManagerOrNot = async (req,res)=>{
    try {
        const query = `SELECT employee.emp_id, employee.first_name, branch.branch_name
                        FROM employee
                        LEFT JOIN branch
                        ON employee.emp_id = branch.mngr_id;`;
        const result = await querys(query);
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

//nested query in SQL

const empSoldOverAmountSingleClient =async (req,res)=>{
    try {
        const query = `
                        SELECT  employee.first_name, employee.last_name
                        FROM employee
                        WHERE employee.emp_id IN(
                        SELECT work_with.emp_id
                        FROM work_with
                        WHERE work_with.Total_sales > "${req.params.amount}"
                        );`;
        const result = await querys(query);
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

const empUnderSpecificManager =async (req,res)=>{
    try {
        const query = `
                        SELECT  employee.first_name, employee.last_name
                        FROM employee
                        WHERE branch_id IN(
                            SELECT branch_id 
                            FROM branch
                            WHERE mngr_id IN (
                                SELECT emp_id
                                FROM employee
                                WHERE first_name = "${req.params.managerName}"
                                LIMIT 1
                            )
                        );`;
        
        const result = await querys(query);
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

// on delete set null(just set the value null on delete it's forgien key)
const deleteManagerFromEmployee = async (req,res)=>{

    try {
        const query = `DELETE FROM employee
                        WHERE emp_id = "${req.params.emp_id}" ;`;
        const result = await querys(query);
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    
}

// on delete cascade(it will delete whole row of it's chilled tables);
const deleteBranch = async (req,res)=>{
    try {
        const query = `DELETE FROM branch
                        WHERE branch_id = "${req.params.branch_id}" ;`;
        const result = await querys(query);
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

module.exports = {
    addEmployee,
    addBranch,
    updateEmployeeTable,
    addBranchSuppier,
    addClient,
    addWorks_with,
    getAllEmployee,
    getAllClient,
    getAllEmployeeOrderBysalary,
    getEmployeeOrderByGenderAndName,
    getHowManyBranchWithEmployee,
    getNumberOfEmplyee,
    EmpAreOldThen,
    getAvgsalary,
    TotalSalaryCompanyPaying,
    employeeInEachBranch,
    totalSalesOfEachSalesman,
    FindClientWhoArekeyWord,
    empBornInSpeMonth,
    cliNameNidNsuppNameNid,
    branchAndThierManager,
    empWithIfBranchManagerOrNot,
    empSoldOverAmountSingleClient,
    empUnderSpecificManager,
    deleteManagerFromEmployee,
    deleteBranch
    
}


