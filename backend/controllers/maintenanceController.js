import maintenanceModel from "../models/maintenanceModel.js";

//add task
export const createTaskController = async (req, res) => {
  try {
    const { taskNumber, task, taskId, description, status, dateAssigned } =
      req.fields;

    //validation
    switch (true) {
      case !taskNumber:
        return res.status(500).send({ error: "Task number is Required" });
      case !task:
        return res.status(500).send({ error: "Task is Required" });
      case !taskId:
        return res.status(500).send({ error: "Task Id is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !status:
        return res.status(500).send({ error: "Status is Required" });
      case !dateAssigned:
        return res.status(500).send({ error: "Date Assigned is Required" });
    }

    const maintenances = new maintenanceModel({ ...req.fields });
    await maintenances.save();
    res.status(201).send({
      success: true,
      message: "Maintenance Task Created successfully",
      maintenances,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Creating Maintenance Task",
    });
  }
};
//get all task
export const getTaskController = async (req, res) => {
  try {
    const maintenances = await maintenanceModel
      .find({})
      .populate("taskId")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: maintenances.length,
      message: "All resources displayed successfully",
      maintenances,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in displaying all maintenance Task",
    });
  }
};
//get single task
export const getSingleTaskController = async (req, res) => {
  try {
    let maintenanceId = req.params.id;
    const maintenances = await maintenanceModel.findById(maintenanceId);
    res.status(200).send({
      success: true,
      message: "Single task fetched successfully",
      maintenances,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting single Task",
      error: error.message,
    });
  }
};

//delete task
export const deleteTaskController = async (req, res) => {
  try {
    let maintenanceId = req.params.id;
    const deletedTask = await maintenanceModel.findByIdAndDelete(maintenanceId);

    if (!deletedTask) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.status(200).send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Task",
      error: error.message,
    });
  }
};

//update task
export const updateTaskController = async (req, res) => {
  try {
    const { taskNumber, task, taskId, description, status, dateAssigned } =
      req.fields;
    //validation
    switch (true) {
      case !taskNumber:
        return res.status(500).send({ error: "Task number is Required" });
      case !task:
        return res.status(500).send({ error: "Task is Required" });
      case !taskId:
        return res.status(500).send({ error: "Task Id is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !status:
        return res.status(500).send({ error: "Status is Required" });
      case !dateAssigned:
        return res.status(500).send({ error: "Date Assigned is Required" });
    }

    const maintenanceId = req.params.id;
    const updateTask = await maintenanceModel.findByIdAndUpdate(
      maintenanceId,
      { ...req.fields },
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).send({ error: "Maintenance Task not found" });
    }

    res.status(201).send({
      success: true,
      message: "Maintenance Task updated successfully",
      createTask: updateTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating Task",
    });
  }
};
