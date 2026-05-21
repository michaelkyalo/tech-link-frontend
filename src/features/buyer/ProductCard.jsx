import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "./usecart";
import { formatCurrency } from "../../utils/helpers";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate      = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={s.card} onClick={() => navigate(`/products/${product.id}`)}>
      <div style={s.imgWrap}>
        {product.image_url
          ? <img src={product.image_url} alt={product.name} style={s.img} />
          : <div style={s.imgFallback}>🌿</div>}
      </div>
      <div style={s.body}>
        {product.category && <span style={s.badge}>{product.category}</span>}
        <h2 style={s.name}>{product.name}</h2>
        <p style={s.desc}>{product.description}</p>
        <div style={s.footer}>
          <span style={s.price}>{formatCurrency(product.price)}</span>
          <button
            onClick={handleAdd}
            style={{ ...s.btn, background: added ? "#15803d" : "#16a34a" }}
          >
            {added ? "✔ Added" : "+ Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  card:       { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "box-shadow .2s", fontFamily: "'DM Sans',sans-serif" },
  imgWrap:    { background: "#f0fdf4", height: 180 },
  img:        { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  imgFallback:{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 },
  body:       { padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6 },
  badge:      { display: "inline-block", background: "#dcfce7", color: "#15803d", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99, width: "fit-content" },
  name:       { margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" },
  desc:       { margin: 0, fontSize: 12, color: "#6b7280", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  footer:     { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  price:      { fontSize: 16, fontWeight: 700, color: "#16a34a" },
  btn:        { color: "#fff", border: "none", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "background .2s" },
};