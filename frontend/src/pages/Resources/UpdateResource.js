import Form from "../../components/layout/Form";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { schema } from "../../dto/resourceDTO"; // Import the Yup schema

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

  const validateField = async (fieldName, value) => {
    try {
      await Yup.reach(schema, fieldName).validate(value);
      return "";
    } catch (error) {
      return error.message;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });

    // Validate field onBlur
    const errorMessage = await validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const [errors, setErrors] = useState({});

  const updateResource = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!id) return alert("Resource to be updated not found!");

    try {
      // Perform validation using Yup schema
      await schema.validate(resource, { abortEarly: false });

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/resources/updateResource/${id}`,
        resource
      );

      if (data?.success) {
        toast.success("Resource updated successfully");
        navigate("/resource");
      } else {
        throw new Error(data?.message || "Failed to update resource");
      }
    } catch (error) {
      console.error("Error updating resource:", error.response);
      toast.error("Error updating resource: " + error.message);
      if (error.inner && error.inner.length > 0) {
        // Yup validation error occurred, set errors object
        const yupErrors = {};
        error.inner.forEach((err) => {
          yupErrors[err.path] = err.message;
        });
        setErrors(yupErrors);
      }
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
      handleSubmit={updateResource}
      handleChange={handleChange}
      errors={errors}
    />
  );
};

export default UpdateResource;
