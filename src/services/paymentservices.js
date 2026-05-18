import api from "./api";

export const initiatePayment = async (data) => {
  const response = await api.post(
    "/payments/initiate",
    data
  );

  return response.data;
};

export const verifyPayment = async (transactionId) => {
  const response = await api.get(
    `/payments/${transactionId}`
  );

  return response.data;
};