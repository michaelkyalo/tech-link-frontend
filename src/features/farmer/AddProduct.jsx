import { useState } from "react";
import { createProduct } from "../farmer/productService";

const CATEGORIES = ["Vegetables", "Grains", "Fruits", "Poultry", "Dairy"];
const INIT = { product_name: "", description: "", price: "", quantity: "", category: "", image_url: "" };

export default function AddProduct() {
  const [form, setForm]       = useState(INIT);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState(null);

  const handleChange = ({ target: { name, value } }) =>
    setForm((f) => ({ ...f, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createProduct(form);
      setForm(INIT);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.header}>
          <span style={{ fontSize: 36 }}>🌿</span>
          <div>
            <h1 style={s.title}>Add Product</h1>
            <p style={s.sub}>List a new item on the marketplace</p>
          </div>
        </div>

        {success && <div style={s.toast}>✔ Product added successfully! Buyers can now see it.</div>}
        {error   && <div style={s.errorToast}>❌ {error}</div>}

        <form onSubmit={handleSubmit} style={s.form}>

          {/* Product Name */}
          <label style={s.field}>
            <span style={s.label}>Product Name</span>
            <input
              name="product_name" type="text" placeholder="e.g. Fresh Tomatoes"
              value={form.product_name} onChange={handleChange}
              required style={s.input}
            />
          </label>

          {/* Category */}
          <label style={s.field}>
            <span style={s.label}>Category</span>
            <select
              name="category" value={form.category}
              onChange={handleChange} required style={s.input}
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          {/* Price & Quantity */}
          <div style={{ display: "flex", gap: 12 }}>
            <label style={{ ...s.field, flex: 1 }}>
              <span style={s.label}>Price (KES)</span>
              <input
                name="price" type="number" placeholder="e.g. 150"
                value={form.price} onChange={handleChange}
                required min="1" style={s.input}
              />
            </label>
            <label style={{ ...s.field, flex: 1 }}>
              <span style={s.label}>Quantity</span>
              <input
                name="quantity" type="number" placeholder="e.g. 100"
                value={form.quantity} onChange={handleChange}
                required min="1" style={s.input}
              />
            </label>
          </div>

          {/* Image URL */}
          <label style={s.field}>
            <span style={s.label}>Image URL (optional)</span>
            <input
              name="image_url" type="text" placeholder="https://…"
              value={form.image_url} onChange={handleChange}
              style={s.input}
            />
          </label>

          {/* Description */}
          <label style={s.field}>
            <span style={s.label}>Description</span>
            <textarea
              name="description" rows={3}
              placeholder="Describe your product…"
              value={form.description} onChange={handleChange}
              required style={{ ...s.input, resize: "vertical" }}
            />
          </label>

          <button type="submit" disabled={loading} style={s.btn}>
            {loading ? "Adding…" : "+ Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

const s = {
  page:       { minHeight: "100vh", background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "'DM Sans',sans-serif" },
  card:       { background: "#fff", borderRadius: 20, padding: "2rem 2.25rem", width: "100%", maxWidth: 460, boxShadow: "0 8px 32px rgba(22,101,52,.10)", border: "1px solid #bbf7d0" },
  header:     { display: "flex", alignItems: "center", gap: 14, marginBottom: "1.75rem" },
  title:      { margin: 0, fontSize: 22, fontWeight: 700, color: "#14532d" },
  sub:        { margin: "2px 0 0", fontSize: 13, color: "#6b7280" },
  toast:      { background: "#dcfce7", color: "#15803d", border: "1px solid #86efac", borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 500, marginBottom: "1.25rem" },
  errorToast: { background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 500, marginBottom: "1.25rem" },
  form:       { display: "flex", flexDirection: "column", gap: 14 },
  field:      { display: "flex", flexDirection: "column", gap: 5 },
  label:      { fontSize: 13, fontWeight: 600, color: "#374151" },
  input:      { padding: "9px 13px", borderRadius: 10, border: "1.5px solid #d1fae5", fontSize: 14, color: "#111827", outline: "none", background: "#f9fffe", fontFamily: "inherit" },
  btn:        { marginTop: 6, padding: 11, background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer" },
};