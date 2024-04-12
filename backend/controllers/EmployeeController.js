
import EmployeeModel from '../models/EmployeeModel.js';

// Create a function to create a new employee
export async function addEmployee(req, res) {
    const Name = req.body.Name
    const NIC = req.body.NIC
    const role = req.body.role
    //const gender = req.body.gender
    const DOB = req.body.DOB
    const contactNo = req.body.contactNo
    const email = req.body.email
    const address = req.body.address
    const joinedDate = req.body.joinedDate

    console.log(Name + NIC + role + DOB + contactNo + email + address + joinedDate) // + gender

    const employee = new EmployeeModel({

        //userId:"45821463#23669546",  
        Name: Name,
        NIC: NIC,
        role: role,
        //gender: gender,
        DOB: DOB,
        contactNo: contactNo,
        email: email,
        address: address,
        joinedDate: joinedDate
    });

    try {
        await employee.save()
        console.log("successfully data inserted")
        res.status(200).send("Data inserted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while inserting data");
    }
}

// Create a function to read all employees
export async function getAllEmployee(req, res) {

    //const userId = "45821463#23669546";
    //const objectId

    try {
        const employee = await EmployeeModel.find({}); //{ userId }
        res.status(200).json(employee);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while retrieving data');
    }
}

// Create a function to read a single employee by id
export async function getEmployee(req, res) {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        console.log('Employee read successfully for update');
        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while retrieving data');
    }
}

// Create a function to update an employee by id
export async function updateEmployee(req, res) {
    const objectId = req.params.id;
    const { 
            Name, 
            NIC, 
            role, 
            //gender, 
            DOB, 
            contactNo, 
            email, 
            address, 
            joinedDate
    } = req.body;

    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            objectId,
            {
                Name: Name,
                NIC: NIC,
                role: role,
                //gender: gender,
                DOB: DOB,
                contactNo: contactNo,
                email: email,
                address: address,
                joinedDate: joinedDate
            },
            { new: true }
        );
        res.status(200).send(updatedEmployee);
        console.log('Employee details updated successfully');

    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while updating data');
    }
}

// Create a function to remove an employee by id
export async function deleteEmployee(req, res) {
    const objectId = req.params.id;
    try {
        await EmployeeModel.findByIdAndDelete(objectId);
        //await EmployeeSalaryModel.findByIdAndDelete(objectId);
        res.status(200).send('Employee removed successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while deleting data');
    }
}

// Export all the controller functions as an object
export default { addEmployee, getAllEmployee, getEmployee, updateEmployee, deleteEmployee };