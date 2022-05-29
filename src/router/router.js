const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/EmployeeController');

router.post('/addEmployee',EmployeeController.addEmployee);
router.post('/addBranch',EmployeeController.addBranch);
router.post('/updateEmployeeTable/:EmployeeId',EmployeeController.updateEmployeeTable);
router.post('/addBranchSuppier',EmployeeController.addBranchSuppier);
router.post('/addClient',EmployeeController.addClient);
router.post('/addWorks_with',EmployeeController.addWorks_with);
router.get('/getAllEmployee',EmployeeController.getAllEmployee);
router.get('/getAllClient',EmployeeController.getAllClient);
router.get('/getAllEmployeeOrderBysalary/:ordertype',EmployeeController.getAllEmployeeOrderBysalary);
router.get('/GetEmByGeNa',EmployeeController.getEmployeeOrderByGenderAndName);
router.get('/getHowManyBranchWithEmployee',EmployeeController.getHowManyBranchWithEmployee);
router.get('/NumberOfEmplyee',EmployeeController.getNumberOfEmplyee);
router.get('/EmployeeOlderThen/:age',EmployeeController.EmpAreOldThen);
router.get('/getAvgsalary',EmployeeController.getAvgsalary);
router.get('/TotalSalaryCompanyPaying',EmployeeController.TotalSalaryCompanyPaying);
router.get('/HowManygenderDifferentBranch',EmployeeController.employeeInEachBranch);
router.get('/totalSalesOfEachSalesman',EmployeeController.totalSalesOfEachSalesman);
router.get('/FindClientWhoArekeyWordAtLast/:key',EmployeeController.FindClientWhoArekeyWord);
router.get('/empBornInSpeMonth/:key',EmployeeController.empBornInSpeMonth);
router.get('/getcliNameNidNsuppNameNid',EmployeeController.cliNameNidNsuppNameNid);
router.get('/branchAndThierManager',EmployeeController.branchAndThierManager);
router.get('/empWithIfBranchManagerOrNot',EmployeeController.empWithIfBranchManagerOrNot);
router.get('/empAmount/:amount',EmployeeController.empSoldOverAmountSingleClient);
router.get('/empUnderSpecificManager/:managerName',EmployeeController.empUnderSpecificManager);
router.get('/deleteManagerFromEmployee/:emp_id',EmployeeController.deleteManagerFromEmployee);
router.delete('/deleteBranch/:branch_id',EmployeeController.deleteBranch);


module.exports = router;