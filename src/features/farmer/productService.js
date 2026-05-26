import api from "../../services/api";

// Farmer's own products dashboard
export const getMyProducts = async () => {
  const response = await api.get("/products/mine");
  return response.data.products;
};

// Public marketplace
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data.products;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.product;
};

export const createProduct = async (data) => {
  const response = await api.post("/products", data);
  return response.data.product;
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data.product;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};