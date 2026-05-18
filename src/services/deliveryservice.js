import api from "./api";


export const getDeliveries = async () => {
  const response = await api.get("/deliveries");
  return response.data;
};

export const trackDelivery = async (id) => {
  const response = await api.get(
    `/deliveries/${id}`
  );

  return response.data;
};