import mongoose from 'mongoose';
// import autoIncrement from 'mongoose-auto-increment';

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    //userId: {
        //type: String,
        //required: true
    //},
    Name: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    //gender: {
        //type: String,
        //required: true
    //},
    DOB: {
        type: Date,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    joinedDate: {
        type: Date,
        required: true
    }
})

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;

//export default mongoose.model("employees",EmployeeSchema);