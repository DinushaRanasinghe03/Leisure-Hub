import Layout from "../../components/layout/LayoutAdmin";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ZeroQuantityResourceTable = () => {
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const fetchFilteredResources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/resources/getResource"
        );
        if (response.data.success) {
          const resources = response.data.resources.filter(
            (resource) => resource.quantity === 0
          );
          setFilteredResources(resources);
        } else {
          throw new Error("Failed to fetch resources");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilteredResources();
  }, []);

  const handleContact = () => {
    window.confirm("Contact the relevant person through E-mail.");
  };

  return (
    <Layout title={"Admin Resources - LeisureHub"}>
      <div>
        <div className="m-20">
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              marginLeft: "5px",
              marginTop: "15px",
              marginBottom: "20px",
            }}
          >
            Low Stock
          </h1>
          <table className="border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Number Order</th>
                <th className="border px-4 py-2">Item ID</th>
                <th className="border px-4 py-2">Item Name</th>
                <th className="border px-4 py-2">Supplier</th>
                <th className="border px-4 py-2">Supplier Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((resource) => (
                <tr key={resource._id}>
                  <td className="border px-4 py-2">{resource.numberOrder}</td>
                  <td className="border px-4 py-2">{resource.itemId}</td>
                  <td className="border px-4 py-2">{resource.itemName}</td>
                  <td className="border px-4 py-2">{resource.supplier}</td>
                  <td className="border px-4 py-2">{resource.supplierEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 ml-auto">
            <button
              className="mr-2 bg-blue-200 text-black py-0.5 px-2 rounded-md border border-black font-bold hover:border-blue-600 hover:shadow-md"
              onClick={handleContact}
            >
              Contact
            </button>
            <Link to="/resource">
              <button className=" text-black py-0.5 px-2 rounded-md border border-black font-bold hover:border-blue-600 hover:shadow-md">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZeroQuantityResourceTable;
