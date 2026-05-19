import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "buyer" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // include form.role in login logic
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <Link to="/" className="auth-logo">
          Agri<span>Link</span>
        </Link>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">
          Don't have an account? <Link to="/register">Sign up free</Link>
        </p>

        <div className="auth-field">
          <label className="auth-label">I am a…</label>
          <div className="auth-role-row">
            <button
              type="button"
              className={`auth-role-btn ${form.role === 'buyer' ? 'active' : ''}`}
              onClick={() => setForm({ ...form, role: 'buyer' })}
            >
              Buyer
            </button>
            <button
              type="button"
              className={`auth-role-btn ${form.role === 'farmer' ? 'active' : ''}`}
              onClick={() => setForm({ ...form, role: 'farmer' })}
            >
              Farmer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="auth-field">
            <label className="auth-label">Email or Phone Number</label>
            <input
              className="auth-input"
              type="text"
              name="email"
              placeholder="you@example.com or +254..."
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <input
                className="auth-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
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

          <div className="auth-options">
            <label className="auth-remember">
              <input type="checkbox" /> Stay logged in for 30 days
            </label>
            <a href="#" className="auth-forgot">Forgot password?</a>
          </div>

          <button type="submit" className="auth-btn">Sign In</button>

        </form>

        <div className="auth-divider" style={{margin: '12px 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.75rem'}}>continue with</div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" className="auth-social-btn" style={{ width: '200px' }}>Google</button>
        </div>

        <p className="auth-footer">
          New to AgriLink? <Link to="/register">Create an account</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;