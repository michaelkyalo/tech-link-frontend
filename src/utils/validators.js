export const isEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isRequired = (value) => {
  return value && value.trim().length > 0;
};

export const isStrongPassword = (password) => {
  return password.length >= 6;
};