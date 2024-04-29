import React, { useState } from "react";
import Form from "../../components/layout/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddResource = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [resource, setResource] = useState({
    numberOrder: "",
    itemId: "",
    itemName: "",
    type: "",
    quantity: "",
    unitPrice: "",
    description: "",
    alertQuantity: "",
    supplier: "",
    supplierEmail: "",
    datePurchased: "",
  });

  const createResource = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(resource);
    try {
      const { data } = await axios.post(
        "http://localhost:8070/api/v1/resources/createResource",
        resource
      );

      console.log(data);

      if (data?.success) {
        toast.success("Resource Created successfully");
        navigate("/resource");
      } else {
        throw new Error(data?.message || "Failed to fetch resources");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting resources: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Form
      type="Create"
      resource={resource}
      setResource={setResource}
      submitting={submitting}
      handleSubmit={createResource}
    />
  );
};

export default AddResource;
