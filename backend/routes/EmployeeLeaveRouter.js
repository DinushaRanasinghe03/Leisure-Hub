import express from 'express';
import {
    addEmployeeLeave,
    getAllEmployeeLeave,
    getEmployeeLeave,
    deleteEmployeeLeave,
    updateEmployeeLeave // Import the updateEmployeeLeave function
} from '../controllers/EmployeeLeaveController.js';

const router = express.Router();

console.log('IN employeeLeaveRouter');

//add employee leave
router.post('/addEmployeeLeave', addEmployeeLeave);

//get all employees' leaves
router.get('/getAllEmployeeLeave', getAllEmployeeLeave);

//get one employee's leave by id
router.get('/getEmployeeLeave/:id',  getEmployeeLeave);

//update employee leave by id
router.put('/updateEmployeeLeave/:id', updateEmployeeLeave); // Add the update route

//delete employee leave by id
router.delete('/deleteEmployeeLeave/:id', deleteEmployeeLeave);

export default router;