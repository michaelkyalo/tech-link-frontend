import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../farmer/productService";
import useCart from "./usecart";
import { formatCurrency } from "../../utils/helpers";
import { startConversation } from "../chat/chatservice";
import { useChat } from "../chat/ChatContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded]     = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const { addToCart } = useCart();
  const { openConversation } = useChat();

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleChatWithFarmer = async () => {
    if (!product?.farmer_id) return;
    setChatLoading(true);
    try {
      const conversation = await startConversation(product.farmer_id);
      openConversation(conversation);
      navigate("/chat");
    } catch (err) {
      console.error("Could not start conversation:", err);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) return <div style={s.center}>⏳ Loading product…</div>;
  if (!product) return <div style={s.center}>❌ Product not found.</div>;

  return (
    <div style={s.page}>
      <button onClick={() => navigate(-1)} style={s.back}>← Back</button>

      <div style={s.card}>
        {/* Image */}
        <div style={s.imgWrap}>
          {product.image_url
            ? <img src={product.image_url} alt={product.name} style={s.img} />
            : <div style={s.imgFallback}>🌿</div>}
        </div>

        {/* Details */}
        <div style={s.info}>
          {product.category && <span style={s.badge}>{product.category}</span>}
          <h1 style={s.name}>{product.name}</h1>
          <p style={s.desc}>{product.description}</p>

          <div style={s.meta}>
            <div style={s.metaItem}>
              <span style={s.metaLabel}>Stock</span>
              <span style={s.metaValue}>{product.stock ?? "—"}</span>
            </div>
            <div style={s.metaItem}>
              <span style={s.metaLabel}>Category</span>
              <span style={s.metaValue}>{product.category ?? "—"}</span>
            </div>
          </div>

          <p style={s.price}>{formatCurrency(product.price)}</p>

          <div style={s.btnGroup}>
            <button
              onClick={handleAddToCart}
              style={{ ...s.btn, background: added ? "#15803d" : "#16a34a" }}
            >
              {added ? "✔ Added to Cart!" : "Add to Cart"}
            </button>

            <button
              onClick={handleChatWithFarmer}
              disabled={chatLoading || !product?.farmer_id}
              style={{ ...s.btn, background: chatLoading ? "#6d28d9" : "#7c3aed" }}
            >
              {chatLoading ? "Opening…" : "💬 Chat with Farmer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  page:        { minHeight: "100vh", background: "#f9fafb", padding: "2rem", fontFamily: "'DM Sans',sans-serif" },
  center:      { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#6b7280" },
  back:        { background: "none", border: "1px solid #d1fae5", color: "#16a34a", padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500, marginBottom: "1.5rem" },
  card:        { background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 860, margin: "0 auto", boxShadow: "0 4px 24px rgba(0,0,0,.06)" },
  imgWrap:     { background: "#f0fdf4", minHeight: 380 },
  img:         { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  imgFallback: { height: 380, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72 },
  info:        { padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 },
  badge:       { display: "inline-block", background: "#dcfce7", color: "#15803d", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 99, width: "fit-content" },
  name:        { margin: 0, fontSize: 26, fontWeight: 700, color: "#111827" },
  desc:        { margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.7 },
  meta:        { display: "flex", gap: 16 },
  metaItem:    { background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 10, padding: "10px 16px", flex: 1 },
  metaLabel:   { display: "block", fontSize: 11, color: "#9ca3af", fontWeight: 500, marginBottom: 3 },
  metaValue:   { fontSize: 15, fontWeight: 600, color: "#111827" },
  price:       { margin: 0, fontSize: 30, fontWeight: 700, color: "#16a34a" },
  btnGroup:    { display: "flex", flexDirection: "column", gap: 10 },
  btn:         { padding: "12px", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "background .2s" },
};