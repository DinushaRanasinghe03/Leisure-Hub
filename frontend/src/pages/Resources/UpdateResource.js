import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../../components/Layout/Form";

import { toast } from "react-hot-toast";

const UpdateResource = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    const getResource = async () => {
      const data = await axios.get(
        `http://localhost:8080/api/v1/resources/getResource/${id}`
      );

      var response;

      if (data.data.resources) {
        response = data.data.resources;
      } else {
        console.log("There's no data to update");
      }

      setResource({
        numberOrder: response.numberOrder,
        itemId: response.itemId,
        itemName: response.itemName,
        type: response.type,
        quantity: response.quantity,
        unitPrice: response.unitPrice,
        description: response.description,
        alertQuantity: response.alertQuantity,
        supplier: response.supplier,
        supplierEmail: response.supplierEmail,
        datePurchased: response.datePurchased,
      });
    };

    if (id) getResource();
  }, [id]);

  const updateNote = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!id) return alert("Note to be updated not found!");

    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/resources/updateResource/${id}`,
        resource
      );
      console.log(data); // Log response from the server
      if (data?.success) {
        toast.success("Resource updated successfully"); // Show success message
        navigate("/resource");
      } else {
        throw new Error(data?.message || "Failed to update resource");
      }
    } catch (error) {
      console.error("Error updating resource:", error.response); // Log error
      toast.error("Error updating resource: " + error.message); // Show error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      resource={resource}
      setResource={setResource}
      submitting={submitting}
      handleSubmit={updateNote}
    />
  );
};

export default UpdateResource;