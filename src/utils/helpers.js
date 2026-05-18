export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(value);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-KE");
};

export const truncate = (text, length = 50) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};