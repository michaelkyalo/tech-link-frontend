import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const RegisterForm = () => {
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border p-2 w-full"
      />

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

      <select
        name="role"
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="buyer">Buyer</option>
        <option value="farmer">Farmer</option>
      </select>

      <button className="bg-green-600 text-white px-4 py-2 w-full">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;