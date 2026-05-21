import { useEffect, useState } from "react";
import { getProducts } from "../farmer/productService";
import { useNavigate } from "react-router-dom";
import useCart from "./usecart";
import { formatCurrency } from "../../utils/helpers";

const EMOJI = { Vegetables: "🥬", Grains: "🌽", Fruits: "🍋", Poultry: "🥚", Dairy: "🥛", default: "🌿" };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [search, setSearch]     = useState("");
  const [cat, setCat]           = useState("All");
  const [added, setAdded]       = useState(null);
  const navigate  = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then(data => setProducts(Array.isArray(data) ? data : data.products || []))
      .catch(err  => setError(err.message))
      .finally(()  => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  const filtered = products.filter(p =>
    (cat === "All" || p.category === cat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 2000);
  };

  if (loading) return <div style={s.center}>⏳ Loading products…</div>;
  if (error)   return <div style={s.center}>❌ Could not load products: {error}</div>;
  if (!products.length) return <div style={s.center}>🌿 No products available yet.</div>;

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>🛒 Browse Products</h1>
          <p style={s.sub}>{filtered.length} of {products.length} products</p>
        </div>
        <input
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={s.search}
        />
      </div>

      {/* Category filters */}
      <div style={s.filters}>
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ ...s.filterBtn, ...(cat === c ? s.filterActive : {}) }}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0
        ? <div style={s.empty}>😕 No products match your search.</div>
        : <div style={s.grid}>
            {filtered.map(p => (
              <div key={p.id} style={s.card} onClick={() => navigate(`/products/${p.id}`)}>
                <div style={s.imgWrap}>
                  {p.image_url
                    ? <img src={p.image_url} alt={p.name} style={s.img} />
                    : <div style={s.imgFallback}>{EMOJI[p.category] || EMOJI.default}</div>}
                </div>
                <div style={s.body}>
                  {p.category && <span style={s.badge}>{p.category}</span>}
                  <h2 style={s.name}>{p.name}</h2>
                  <p style={s.desc}>{p.description}</p>
                  <div style={s.footer}>
                    <span style={s.price}>{formatCurrency(p.price)}</span>
                    <button
                      onClick={e => handleAdd(e, p)}
                      style={{ ...s.btn, background: added === p.id ? "#15803d" : "#16a34a" }}
                    >
                      {added === p.id ? "✔ Added" : "+ Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

const s = {
  page:        { minHeight: "100vh", background: "#f9fafb", padding: "2rem", fontFamily: "'DM Sans',sans-serif" },
  center:      { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#6b7280", fontFamily: "'DM Sans',sans-serif" },
  header:      { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: 12 },
  title:       { margin: 0, fontSize: 24, fontWeight: 700, color: "#14532d" },
  sub:         { margin: "3px 0 0", fontSize: 13, color: "#6b7280" },
  search:      { padding: "8px 14px", borderRadius: 10, border: "1.5px solid #d1fae5", fontSize: 14, outline: "none", minWidth: 200, fontFamily: "inherit" },
  filters:     { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" },
  filterBtn:   { padding: "6px 16px", borderRadius: 99, border: "1px solid #d1fae5", background: "#fff", color: "#374151", fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
  filterActive: { background: "#16a34a", color: "#fff", border: "1px solid #16a34a" },
  empty:       { textAlign: "center", padding: "3rem", color: "#9ca3af", fontSize: 15 },
  grid:        { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 20 },
  card:        { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", cursor: "pointer" },
  imgWrap:     { background: "#f0fdf4", height: 170 },
  img:         { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  imgFallback: { height: 170, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 },
  body:        { padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6 },
  badge:       { display: "inline-block", background: "#dcfce7", color: "#15803d", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99, width: "fit-content" },
  name:        { margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" },
  desc:        { margin: 0, fontSize: 12, color: "#6b7280", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  footer:      { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  price:       { fontSize: 16, fontWeight: 700, color: "#16a34a" },
  btn:         { color: "#fff", border: "none", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" },
};