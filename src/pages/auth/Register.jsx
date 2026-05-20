import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!form.role) {
      alert("Please select a role (Farmer or Buyer).");
      return;
    }

    try {
      const data = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        birthday: form.birthday,
        password: form.password,
        role: form.role,
      };

      await register(data);
      alert("Account created! Please log in.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  const passwordsMatch = form.confirmPassword && form.password === form.confirmPassword;
  const passwordsMismatch = form.confirmPassword && form.password !== form.confirmPassword;

  return (
    <div className="auth-page">
      <div className="auth-card">

        <Link to="/" className="auth-logo">
          Agri<span>Link</span>
        </Link>

        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">
          Already a member? <Link to="/login">Sign in</Link>
        </p>

        <form onSubmit={handleSubmit}>


          <div className="auth-field">
            <label className="auth-label">I am a…</label>
            <div className="auth-role-row">
              <button
                type="button"
                className={`auth-role-btn ${form.role === "farmer" ? "active" : ""}`}
                onClick={() => setForm({ ...form, role: "farmer" })}
              >
                Farmer
              </button>
              <button
                type="button"
                className={`auth-role-btn ${form.role === "buyer" ? "active" : ""}`}
                onClick={() => setForm({ ...form, role: "buyer" })}
              >
                Buyer
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="auth-field">
            <label className="auth-label">Full Name</label>
            <input
              className="auth-input"
              type="text"
              name="name"
              placeholder="lyon nganga"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-grid-2">
            <div className="auth-field">
              <label className="auth-label">Phone Number</label>
              <input
                className="auth-input"
                type="tel"
                name="phone"
                placeholder="+254 7XX XXX XXX"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Birthday</label>
              <input
                className="auth-input"
                type="date"
                name="birthday"
                value={form.birthday}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>


          <div className="auth-grid-2">
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <input
                  className="auth-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=""
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "show" : "hide"}

                </button>
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">Confirm</label>
              <div className="auth-input-wrap">
                <input
                  className={`auth-input ${passwordsMatch ? "is-valid" : ""} ${passwordsMismatch ? "is-error" : ""}`}
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repeat"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? "show" : "hide"}
                </button>
              </div>
              {passwordsMatch && <p className="auth-hint ok"> Match</p>}
              {passwordsMismatch && <p className="auth-hint err"> No match</p>}
            </div>
          </div>

          <button type="submit" className="auth-btn">Create Account</button>

        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;