import api from "../../services/api";

export const getChats = async () => {
  const response = await api.get("/chats");
  return response.data;
};


export const getMessages = async (chatId) => {
  const response = await api.get(`/chats/${chatId}`);
  return response.data;
};

export const sendMessage = async (chatId, data) => {
  const response = await api.post(
    `/chats/${chatId}`,
    data
  );

  return response.data;
};