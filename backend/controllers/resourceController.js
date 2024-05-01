import resourcesModel from "../models/resourcesModel.js";

//Add resources
export const createResourceController = async (req, res) => {
  try {
    const {
      numberOrder,
      itemId,
      itemName,
      type,
      quantity,
      unitPrice,
      description,
      alertQuantity,
      supplier,
      supplierEmail,
      datePurchased,
    } = req.body;

    //validation
    switch (true) {
      case !numberOrder:
        return res.status(500).send({ error: "Number Order is Required" });
      case !itemId:
        return res.status(500).send({ error: "Item ID is Required" });
      case !itemName:
        return res.status(500).send({ error: "Item Name is Required" });
      case !type:
        return res.status(500).send({ error: "Type is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !unitPrice:
        return res.status(500).send({ error: "Unit Price is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !alertQuantity:
        return res.status(500).send({ error: "Alert Quantity is Required" });
      case !supplier:
        return res.status(500).send({ error: "Supplier is Required" });
      case !supplierEmail:
        return res.status(500).send({ error: "Supplier Email is Required" });
      case !datePurchased:
        return res.status(500).send({ error: "Date Purchased is Required" });
    }

    const resources = new resourcesModel({ ...req.body });
    await resources.save();
    res.status(201).send({
      success: true,
      message: "Resource Created successfully",
      resources,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Creating Resources",
    });
  }
};

//get all resources with filter
export const getResourceController = async (req, res) => {
  try {
    const resources = await resourcesModel
      .find({})
      .populate("type")
      .limit(12)
      .sort({ createdAt: -1 });

    // Calculate total amount spent
    let totalAmountSpent = 0;
    resources.forEach((resource) => {
      totalAmountSpent += resource.quantity * resource.unitPrice;
    });

    // Calculate total count
    const totalCount = resources.length;

    // Count resources with Quantity = 0
    const zeroQuantityCount = resources.filter(
      (resource) => resource.quantity === 0
    ).length;

    res.status(200).send({
      success: true,
      totalAmountSpent: totalAmountSpent, // Send total amount spent in response
      countTotal: totalCount, // Send total count in response
      zeroQuantityCount: zeroQuantityCount, // Send count of resources with Quantity = 0
      message: "All resources displayed successfully",
      resources,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Resources",
      error: error.message,
    });
  }
};

//Get single resource
export const getSingleResourceController = async (req, res) => {
  try {
    let resourceId = req.params.id;
    const resources = await resourcesModel.findById(resourceId);
    res.status(200).send({
      success: true,
      message: "Single resource fetched successfully",
      resources,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting single Resources",
      error: error.message,
    });
  }
};

//delete resource
export const deleteResourceController = async (req, res) => {
  try {
    let resourceId = req.params.id;
    const deletedResource = await resourcesModel.findByIdAndDelete(resourceId);

    if (!deletedResource) {
      return res.status(404).send({ error: "Resource not found" });
    }

    res.status(200).send({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Resources",
      error: error.message,
    });
  }
};

//Update Resource
export const updateResourceController = async (req, res) => {
  try {
    const {
      numberOrder,
      itemId,
      itemName,
      type,
      quantity,
      unitPrice,
      description,
      alertQuantity,
      supplier,
      supplierEmail,
      datePurchased,
    } = req.body;

    //validation
    switch (true) {
      case !numberOrder:
        return res.status(500).send({ error: "Number Order is Required" });
      case !itemId:
        return res.status(500).send({ error: "Item ID is Required" });
      case !itemName:
        return res.status(500).send({ error: "Item Name is Required" });
      case !type:
        return res.status(500).send({ error: "Type is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !unitPrice:
        return res.status(500).send({ error: "Unit Price is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !alertQuantity:
        return res.status(500).send({ error: "Alert Quantity is Required" });
      case !supplier:
        return res.status(500).send({ error: "Supplier is Required" });
      case !supplierEmail:
        return res.status(500).send({ error: "Supplier Email is Required" });
      case !datePurchased:
        return res.status(500).send({ error: "Date Purchased is Required" });
    }

    const resources = await resourcesModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!resources) {
      return res.status(404).send({ error: "Resource not found" });
    }

    res.status(201).send({
      success: true,
      message: "Resource updated successfully",
      resources,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating Resources",
    });
  }
};