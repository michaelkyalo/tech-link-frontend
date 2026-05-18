import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button className="bg-green-600 text-white px-4 py-2 w-full">
        Login
      </button>
    </form>
  );
};

export default LoginForm;