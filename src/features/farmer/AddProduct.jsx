import { useState } from "react";

// 👇 Swap this with your real import once path is confirmed:
// import { createProduct } from "../../services/productService";
const createProduct = async (data) => {
  console.log("Submitting product:", data);
  return new Promise((res) => setTimeout(res, 800));
};

const INIT = { name: "", description: "", price: "", image_url: "" };

export default function AddProduct() {
  const [form, setForm]       = useState(INIT);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setForm((f) => ({ ...f, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createProduct(form);
    setForm(INIT);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
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

        {success && <div style={s.toast}>✔ Product added successfully!</div>}

        <form onSubmit={handleSubmit} style={s.form}>
          {[
            { name: "name",      label: "Product Name", placeholder: "e.g. Fresh Tomatoes", type: "text" },
            { name: "price",     label: "Price (KES)",  placeholder: "e.g. 150",             type: "number" },
            { name: "image_url", label: "Image URL",    placeholder: "https://…",            type: "text" },
          ].map(({ name, label, placeholder, type }) => (
            <label key={name} style={s.field}>
              <span style={s.label}>{label}</span>
              <input
                name={name} type={type} placeholder={placeholder}
                value={form[name]} onChange={handleChange}
                required={name === "name" || name === "price"}
                style={s.input}
              />
            </label>
          ))}

          <label style={s.field}>
            <span style={s.label}>Description</span>
            <textarea
              name="description" rows={3}
              placeholder="Describe your product…"
              value={form.description} onChange={handleChange}
              style={{ ...s.input, resize: "vertical" }}
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
  page:  { minHeight: "100vh", background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "'DM Sans',sans-serif" },
  card:  { background: "#fff", borderRadius: 20, padding: "2rem 2.25rem", width: "100%", maxWidth: 460, boxShadow: "0 8px 32px rgba(22,101,52,.10)", border: "1px solid #bbf7d0" },
  header:{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.75rem" },
  title: { margin: 0, fontSize: 22, fontWeight: 700, color: "#14532d" },
  sub:   { margin: "2px 0 0", fontSize: 13, color: "#6b7280" },
  toast: { background: "#dcfce7", color: "#15803d", border: "1px solid #86efac", borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 500, marginBottom: "1.25rem" },
  form:  { display: "flex", flexDirection: "column", gap: 14 },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  input: { padding: "9px 13px", borderRadius: 10, border: "1.5px solid #d1fae5", fontSize: 14, color: "#111827", outline: "none", background: "#f9fffe", fontFamily: "inherit" },
  btn:   { marginTop: 6, padding: 11, background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer" },
};