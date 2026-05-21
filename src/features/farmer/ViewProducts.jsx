import { useEffect, useState } from "react";
// import { getProducts } from "../../services/productService"; // 👈 swap in your real call

const mockProducts = [
  { id: 1, name: "Fresh Tomatoes", category: "Vegetables", price: 80,  image_url: "" },
  { id: 2, name: "Sweet Maize",    category: "Grains",     price: 50,  image_url: "" },
  { id: 3, name: "Ripe Mangoes",   category: "Fruits",     price: 120, image_url: "" },
];

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch]     = useState("");

  useEffect(() => {
    // Replace mockProducts with: getProducts().then(setProducts)
    setProducts(mockProducts);
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>🛒 My Products</h1>
          <p style={s.sub}>{products.length} products listed</p>
        </div>
        <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} style={s.search} />
      </div>

      <div style={s.grid}>
        {filtered.map(p => (
          <div key={p.id} style={s.card}>
            <div style={s.img}>{p.image_url ? <img src={p.image_url} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : "🌿"}</div>
            <div style={s.body}>
              <span style={s.badge}>{p.category}</span>
              <p style={s.name}>{p.name}</p>
              <p style={s.price}>KES {p.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ color:"#9ca3af", fontSize:14 }}>No products found.</p>}
      </div>
    </div>
  );
}

const s = {
  page:   { minHeight:"100vh", background:"#f9fafb", padding:"2rem", fontFamily:"'DM Sans',sans-serif", maxWidth:900, margin:"0 auto" },
  header: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap", gap:12 },
  title:  { margin:0, fontSize:24, fontWeight:700, color:"#14532d" },
  sub:    { margin:"3px 0 0", fontSize:13, color:"#6b7280" },
  search: { padding:"8px 14px", borderRadius:10, border:"1.5px solid #d1fae5", fontSize:14, outline:"none", minWidth:200 },
  grid:   { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:16 },
  card:   { background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, overflow:"hidden" },
  img:    { height:120, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 },
  body:   { padding:"12px 14px" },
  badge:  { fontSize:11, background:"#dcfce7", color:"#15803d", padding:"2px 8px", borderRadius:99, fontWeight:500 },
  name:   { margin:"8px 0 4px", fontSize:14, fontWeight:600, color:"#111827" },
  price:  { margin:0, fontSize:15, fontWeight:700, color:"#16a34a" },
};