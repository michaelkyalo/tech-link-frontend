// src/components/forms/ProductForm.jsx

import { useState } from "react";

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    category: initialData.category || "",
    price: initialData.price || "",
    stock: initialData.stock || "",
    image_url: initialData.image_url || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      image_url: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label className="block mb-1 font-medium">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          className="w-full border p-2 rounded"
          rows="4"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Category
        </label>

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g Vegetables"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Price
        </label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Stock Quantity
        </label>

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Enter stock quantity"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Image URL
        </label>

        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Enter image URL"
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;