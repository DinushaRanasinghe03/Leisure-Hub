import { useNavigate } from "react-router-dom";
import React from "react";
import HeaderAdmin from "./HeaderAdmin";

const Form = ({ type, resource, setResource, submitting, handleSubmit }) => {
  const navigate = useNavigate();

  return (
    <div>
      <HeaderAdmin />
    <section>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-300">
        <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-md md:max-w-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            {type} Resource
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="itemNo"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Number
              </label>
              <input
                type="text"
                id="itemNo"
                name="itemNo"
                placeholder="01"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.numberOrder}
                onChange={(e) =>
                  setResource({ ...resource, numberOrder: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="itemId"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Item ID
              </label>
              <input
                type="text"
                id="itemId"
                name="itemId"
                placeholder="T001"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.itemId}
                onChange={(e) =>
                  setResource({ ...resource, itemId: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="itemName"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                placeholder="Enter Item Name"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.itemName}
                onChange={(e) =>
                  setResource({ ...resource, itemName: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="type"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.type}
                onChange={(e) =>
                  setResource({ ...resource, type: e.target.value })
                }
                required
              >
                <option value="">Select Type</option>
                <option value="Theater">Theater</option>
                <option value="Games">Games</option>
                <option value="Activities">Activities</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter quantity"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.quantity}
                onChange={(e) =>
                  setResource({ ...resource, quantity: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="unitPrice"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Unit Price
              </label>
              <input
                type="number"
                id="unitPrice"
                name="unitPrice"
                step="0.01"
                placeholder="200"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.unitPrice}
                onChange={(e) =>
                  setResource({ ...resource, unitPrice: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Description
              </label>
              <input
                id="description"
                name="description"
                rows="2"
                cols="50"
                className="w-full h-32 py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.description}
                onChange={(e) =>
                  setResource({ ...resource, description: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="alertQuantity"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Alert Quantity
              </label>
              <input
                type="number"
                id="alertQuantity"
                name="alertQuantity"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.alertQuantity}
                onChange={(e) =>
                  setResource({ ...resource, alertQuantity: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="supplier"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Supplier
              </label>
              <input
                type="text"
                id="supplier"
                name="supplier"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.supplier}
                onChange={(e) =>
                  setResource({ ...resource, supplier: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="supplierEmail"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Supplier Email
              </label>
              <input
                type="text"
                id="supplierEmail"
                name="supplierEmail"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.supplierEmail}
                onChange={(e) =>
                  setResource({ ...resource, supplierEmail: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="datePurchased"
                className="block text-lg font-medium text-gray-200 mb-2"
              >
                Date Purchased
              </label>
              <input
                type="date"
                id="datePurchased"
                name="datePurchased"
                className="w-full py-2 px-4 rounded border-2 border-gray-600 focus:outline-none focus:border-indigo-500"
                value={resource.datePurchased}
                onChange={(e) =>
                  setResource({ ...resource, datePurchased: e.target.value })
                }
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(-1)}
                className="w-full md:w-auto bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 focus:outline-none focus:bg-red-600 mr-4 md:mr-0"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto bg-gray-600 text-white py-3 px-6 rounded-full hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                {submitting ? `${type.slice(0, -1)}ing...` : type}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Form;