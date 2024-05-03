import Form from "../../components/layout/Form";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { schema } from "../../dto/resourceDTO";

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

  const createResource = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await schema.validate(resource, { abortEarly: false });
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/resources/createResource",
        resource
      );

      if (data?.success) {
        toast.success("Resource Created successfully");
        navigate("/resource");
      } else {
        throw new Error(data?.message || "Failed to fetch resources");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting resources: " + error.message);
      if (error instanceof Yup.ValidationError) {
        // Yup validation error occurred, set errors object for Form component
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
      type="Create"
      resource={resource}
      setResource={setResource}
      submitting={submitting}
      handleSubmit={createResource}
      handleChange={handleChange}
      errors={errors}
    />
  );
};

export default AddResource;
