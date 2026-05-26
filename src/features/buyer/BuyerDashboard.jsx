import { Link, useNavigate } from "react-router-dom";
import { useChat } from "../chat/ChatContext";
import { startConversation } from "../chat/chatservice";
import { useState, useEffect } from "react";
import api from "../../services/api";

// ── Inject styles once ─────────────────────────────────────────────────────
const STYLE_ID = "agrilink-mkt-v2";
if (!document.getElementById(STYLE_ID)) {
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(20px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position:-600px 0; }
      100% { background-position: 600px 0; }
    }

    * { box-sizing: border-box; }

    .mkt-card {
      background: #ffffff;
      border: 1px solid #e4ede4;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      animation: fadeUp .45s ease both;
      transition: transform .28s cubic-bezier(.22,.68,0,1.2), box-shadow .28s ease, border-color .28s ease;
      box-shadow: 0 2px 10px rgba(0,0,0,.06);
    }
    .mkt-card:hover {
      transform: translateY(-6px) scale(1.012);
      box-shadow: 0 18px 48px rgba(0,0,0,.12);
      border-color: #b8d9b8;
    }
    .mkt-card:hover .card-img {
      transform: scale(1.06);
    }
    .card-img {
      transition: transform .5s cubic-bezier(.22,.68,0,1.2);
    }

    .heart-btn {
      position: absolute;
      top: 12px; right: 12px;
      width: 34px; height: 34px;
      border-radius: 50%;
      background: rgba(255,255,255,.92);
      border: none;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 15px;
      box-shadow: 0 2px 8px rgba(0,0,0,.14);
      transition: transform .18s, background .18s;
      z-index: 2;
    }
    .heart-btn:hover { transform: scale(1.18); background: #fff; }

    .badge {
      position: absolute;
      top: 12px; left: 12px;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .05em;
      text-transform: uppercase;
      font-family: 'DM Sans', sans-serif;
      z-index: 2;
    }
    .badge-organic  { background: #d1fae5; color: #065f46; }
    .badge-harvest  { background: #fef3c7; color: #92400e; }
    .badge-bulk     { background: #cffafe; color: #0e7490; }
    .badge-verified { background: #dbeafe; color: #1e40af; }
    .badge-fresh    { background: #ede9fe; color: #5b21b6; }

    .view-details {
      background: none;
      border: none;
      padding: 0;
      font-size: 13px;
      font-weight: 600;
      font-family: 'DM Sans', sans-serif;
      color: #2e7d52;
      cursor: pointer;
      text-decoration: none;
      transition: color .15s;
    }
    .view-details:hover { color: #1a5c3a; text-decoration: underline; }

    .mkt-filter-pill {
      padding: 6px 18px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      font-family: 'DM Sans', sans-serif;
      border: 1.5px solid;
      cursor: pointer;
      transition: all .18s ease;
    }
    .mkt-filter-pill:hover {
      background: rgba(46,125,82,.1) !important;
      border-color: rgba(46,125,82,.4) !important;
    }

    .mkt-search-input {
      width: 100%;
      background: #fff;
      border: 1.5px solid #daeada;
      border-radius: 12px;
      padding: 10px 14px 10px 42px;
      font-size: 13px;
      font-family: 'DM Sans', sans-serif;
      color: #1a2e1a;
      transition: border-color .2s, box-shadow .2s;
    }
    .mkt-search-input::placeholder { color: #9ab89a; }
    .mkt-search-input:focus {
      outline: none;
      border-color: #2e7d52;
      box-shadow: 0 0 0 3px rgba(46,125,82,.09);
    }

    .sort-dropdown {
      appearance: none;
      background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%232e7d52' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
      border: 1.5px solid #c8ddc8;
      border-radius: 10px;
      padding: 8px 34px 8px 14px;
      font-size: 13px;
      font-family: 'DM Sans', sans-serif;
      color: #1a4a2a;
      font-weight: 600;
      cursor: pointer;
    }
    .sort-dropdown:focus { outline: none; border-color: #2e7d52; }

    .skeleton-box {
      background: linear-gradient(90deg, #f0f4f0 25%, #e4ebe4 50%, #f0f4f0 75%);
      background-size: 600px 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 10px;
    }

    .msg-btn {
      width: 100%;
      padding: 10px 0;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 600;
      font-family: 'DM Sans', sans-serif;
      letter-spacing: .04em;
      cursor: pointer;
      transition: background .2s, transform .15s, box-shadow .2s;
      border: 1px solid rgba(46,125,82,.22);
      background: rgba(46,125,82,.08);
      color: #2e7d52;
    }
    .msg-btn:hover:not(:disabled) {
      background: rgba(46,125,82,.15);
      transform: scale(1.03);
      box-shadow: 0 4px 14px rgba(46,125,82,.18);
    }
    .msg-btn:disabled { opacity: .5; cursor: default; }
  `;
  document.head.appendChild(s);
}

// ── Badge logic ────────────────────────────────────────────────────────────
const BADGE_CYCLE = [
  { label: "ORGANIC",     cls: "badge-organic"  },
  { label: "NEW HARVEST", cls: "badge-harvest"  },
  { label: "BULK ORDER",  cls: "badge-bulk"     },
  { label: "VERIFIED",    cls: "badge-verified" },
  { label: "FRESH",       cls: "badge-fresh"    },
];

function getBadge(product) {
  const name = (product.product_name || "").toLowerCase();
  const cat  = (product.category     || "").toLowerCase();
  if (product.is_organic  || name.includes("organic")) return BADGE_CYCLE[0];
  if (product.is_new_harvest)                          return BADGE_CYCLE[1];
  if (product.is_bulk     || name.includes("bulk"))    return BADGE_CYCLE[2];
  if (product.is_verified || cat === "dairy")          return BADGE_CYCLE[3];
  // deterministic fallback so it varies
  return BADGE_CYCLE[(Number(product.product_id) || 0) % BADGE_CYCLE.length];
}

// ── Emoji fallback ─────────────────────────────────────────────────────────
const KEYWORDS = {
  tomato:"🍅", mango:"🥭", banana:"🍌", avocado:"🥑", spinach:"🥬",
  kale:"🥬", cabbage:"🥬", carrot:"🥕", potato:"🥔", onion:"🧅",
  garlic:"🧄", pepper:"🌶️", maize:"🌽", corn:"🌽", wheat:"🌾",
  rice:"🍚", milk:"🥛", egg:"🥚", chicken:"🐓", beef:"🥩",
  fish:"🐟", honey:"🍯", lemon:"🍋", orange:"🍊", apple:"🍎",
  pear:"🍐", bean:"🫘", pea:"🫛", cucumber:"🥒", broccoli:"🥦",
};
function getEmoji(product) {
  const n = (product.product_name || "").toLowerCase();
  for (const [kw, em] of Object.entries(KEYWORDS)) if (n.includes(kw)) return em;
  return "🌱";
}

const CATEGORIES = ["All","Vegetables","Fruits","Grains","Dairy","Poultry","Herbs"];

// ── Skeleton ───────────────────────────────────────────────────────────────
function ProductSkeleton() {
  return (
    <div style={{ background:"#fff", border:"1px solid #e4ede4", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,.05)" }}>
      <div className="skeleton-box" style={{ height:210 }} />
      <div style={{ padding:"1rem 1.25rem 1.25rem" }}>
        <div className="skeleton-box" style={{ height:15, width:"65%", marginBottom:10 }} />
        <div className="skeleton-box" style={{ height:11, width:"45%", marginBottom:18 }} />
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <div>
            <div className="skeleton-box" style={{ height:10, width:72, marginBottom:6 }} />
            <div className="skeleton-box" style={{ height:20, width:90 }} />
          </div>
          <div style={{ textAlign:"right" }}>
            <div className="skeleton-box" style={{ height:10, width:60, marginBottom:6 }} />
            <div className="skeleton-box" style={{ height:14, width:72 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Product Card ───────────────────────────────────────────────────────────
function ProductCard({ product, onMessage, chatting, delay = 0 }) {
  const navigate   = useNavigate();
  const [imgErr, setImgErr] = useState(false);
  const [liked, setLiked]   = useState(false);
  const badge    = getBadge(product);
  const emoji    = getEmoji(product);
  const hasImage = product.image_url && !imgErr;
  const distKm   = product.distance_km ?? (((Number(product.product_id) || 1) * 7) % 47 + 3);
  const isChatting = chatting === product.product_id;

  return (
    <div
      className="mkt-card"
      style={{ animationDelay:`${delay}ms` }}
      onClick={() => navigate(`/products/${product.product_id}`)}
    >
      {/* Image area */}
      <div style={{ height:210, position:"relative", overflow:"hidden", background:"#f2f7f2" }}>
        {hasImage ? (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="card-img"
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div style={{
            width:"100%", height:"100%",
            background:"linear-gradient(135deg,#eef7ec,#daeeda)",
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
          }}>
            <span className="card-img" style={{ fontSize:72, lineHeight:1, filter:"drop-shadow(0 4px 12px rgba(0,0,0,.12))" }}>
              {emoji}
            </span>
            <span style={{ marginTop:8, fontSize:11, color:"#5a9a6a", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>
              {product.category}
            </span>
          </div>
        )}

        {/* Badge */}
        <span className={`badge ${badge.cls}`}>{badge.label}</span>

        {/* Heart */}
        <button
          className="heart-btn"
          onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }}
          aria-label="Save to wishlist"
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Card body */}
      <div style={{ padding:"1rem 1.25rem 1.25rem" }}>
        {/* Product name */}
        <h3 style={{
          margin:"0 0 7px",
          fontSize:16, fontWeight:700,
          fontFamily:"'DM Sans',sans-serif",
          color:"#0f1f0f", lineHeight:1.3,
          whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
        }}>
          {product.product_name}
        </h3>

        {/* Seller */}
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:14 }}>
          <div style={{
            width:24, height:24, borderRadius:"50%", flexShrink:0,
            background:"linear-gradient(135deg,#2e7d52,#5aad7a)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:10, color:"#fff", fontWeight:700,
          }}>
            {(product.farmer_name || "F").charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize:12, color:"#7a9a7a", fontFamily:"'DM Sans',sans-serif" }}>
            by {product.farmer_name || "Local Farmer"}
          </span>
        </div>

        {/* Price + distance row */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
          {/* Left: price */}
          <div>
            <p style={{ margin:"0 0 2px", fontSize:11, color:"#9ab89a", fontFamily:"'DM Sans',sans-serif" }}>
              Price per kg
            </p>
            <p style={{ margin:0, fontSize:21, fontWeight:700, color:"#0f1f0f", fontFamily:"'DM Sans',sans-serif", lineHeight:1 }}>
              KES {Number(product.price || 0).toLocaleString()}
            </p>
          </div>

          {/* Right: distance + view details */}
          <div style={{ textAlign:"right" }}>
            <p style={{
              margin:"0 0 3px",
              fontSize:11, color:"#9ab89a",
              fontFamily:"'DM Sans',sans-serif",
              display:"flex", alignItems:"center", gap:3, justifyContent:"flex-end",
            }}>
              {/* pin icon */}
              <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 0C2.79 0 1 1.79 1 4c0 3 4 9 4 9s4-6 4-9c0-2.21-1.79-4-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="#9ab89a"/>
              </svg>
              {distKm}km away
            </p>
            <button
              className="view-details"
              onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.product_id}`); }}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Message button */}
        <button
          className="msg-btn"
          style={{ marginTop:14 }}
          onClick={(e) => { e.stopPropagation(); onMessage(product); }}
          disabled={isChatting}
        >
          {isChatting ? "Opening chat…" : "💬 Message Farmer"}
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function Marketplace() {
  const { unreadCount, openConversation } = useChat();
  const navigate = useNavigate();

  const [products, setProducts]             = useState([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(null);
  const [search, setSearch]                 = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy]                 = useState("newest");
  const [chatting, setChatting]             = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res  = await api.get("/products");
        const data = res.data;
        setProducts(Array.isArray(data) ? data : Array.isArray(data.products) ? data.products : []);
      } catch {
        setError("Could not load products. Check your connection.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = products
    .filter(p => {
      const q = search.toLowerCase();
      const matchSearch =
        (p.product_name || "").toLowerCase().includes(q) ||
        (p.farmer_name  || "").toLowerCase().includes(q) ||
        (p.category     || "").toLowerCase().includes(q);
      const matchCat =
        activeCategory === "All" ||
        (p.category || "").toLowerCase() === activeCategory.toLowerCase();
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc")  return (a.price || 0) - (b.price || 0);
      if (sortBy === "price_desc") return (b.price || 0) - (a.price || 0);
      return (Number(b.product_id) || 0) - (Number(a.product_id) || 0);
    });

  const handleMessage = async (product) => {
    if (!product.farmer_id) return;
    setChatting(product.product_id);
    try {
      const conv = await startConversation(product.farmer_id);
      openConversation(conv);
      navigate("/chat");
    } catch (e) {
      console.error("Chat error:", e);
    } finally {
      setChatting(null);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f5faf5", fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ maxWidth:1300, margin:"0 auto", padding:"2.5rem 2rem 5rem" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom:"2rem", animation:"fadeUp .5s ease both" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
            <div>
              <p style={{ margin:"0 0 5px", fontSize:11, fontWeight:700, color:"#2e7d52", letterSpacing:".15em", textTransform:"uppercase" }}>
                Marketplace
              </p>
              <h1 style={{ margin:0, fontSize:"clamp(1.75rem,3vw,2.4rem)", fontFamily:"'Playfair Display',serif", fontWeight:700, color:"#0f1f0f", lineHeight:1.2 }}>
                Fresh Produce Available
              </h1>
            </div>

            <Link to="/chat" style={{
              display:"flex", alignItems:"center", gap:8,
              background:"#fff", border:"1.5px solid #c8ddc8",
              borderRadius:12, padding:"10px 18px",
              color:"#2e7d52", textDecoration:"none",
              fontSize:13, fontWeight:600, position:"relative",
              boxShadow:"0 2px 8px rgba(0,0,0,.06)",
            }}>
              💬 Messages
              {unreadCount > 0 && (
                <span style={{
                  position:"absolute", top:-6, right:-6,
                  background:"#ef4444", color:"#fff",
                  fontSize:10, fontWeight:700, borderRadius:999,
                  minWidth:18, height:18, display:"flex",
                  alignItems:"center", justifyContent:"center", padding:"0 4px",
                }}>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ── Search bar + results count + sort ── */}
        <div style={{ marginBottom:"1.5rem", animation:"fadeUp .5s .07s ease both" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", marginBottom:14 }}>
            {/* Search */}
            <div style={{ position:"relative", flex:"1 1 260px", maxWidth:460 }}>
              <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:14, pointerEvents:"none", color:"#9ab89a" }}>
                🔍
              </span>
              <input
                className="mkt-search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products, farmers…"
              />
            </div>

            {!loading && !error && (
              <div style={{ display:"flex", alignItems:"center", gap:10, marginLeft:"auto", flexWrap:"wrap" }}>
                <span style={{ fontSize:13, color:"#7a9a7a", fontWeight:500, whiteSpace:"nowrap" }}>
                  Showing {filtered.length.toLocaleString()} results
                </span>
                <span style={{ color:"#c8ddc8" }}>|</span>
                <select className="sort-dropdown" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="newest">Sort by: Newest</option>
                  <option value="price_asc">Sort by: Price ↑</option>
                  <option value="price_desc">Sort by: Price ↓</option>
                </select>
              </div>
            )}
          </div>

          {/* Category pills */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className="mkt-filter-pill"
                onClick={() => setActiveCategory(cat)}
                style={{
                  background:    activeCategory === cat ? "#2e7d52"  : "#fff",
                  borderColor:   activeCategory === cat ? "#2e7d52"  : "#daeada",
                  color:         activeCategory === cat ? "#fff"     : "#3a7a4a",
                  boxShadow:     activeCategory === cat ? "0 2px 8px rgba(46,125,82,.25)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:12, padding:"14px 18px", marginBottom:20, color:"#991b1b", fontSize:13 }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Product Grid ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:22 }}>
          {loading
            ? Array.from({ length:8 }).map((_,i) => <ProductSkeleton key={i} />)
            : filtered.length === 0
            ? (
              <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"5rem 2rem", color:"#9ab89a" }}>
                <div style={{ fontSize:52, marginBottom:16 }}>🌱</div>
                <p style={{ fontSize:17, fontFamily:"'Playfair Display',serif", color:"#4a7a5a", margin:"0 0 8px" }}>
                  No products found
                </p>
                <p style={{ fontSize:13, margin:0 }}>Try a different search or category</p>
              </div>
            )
            : filtered.map((product, i) => (
              <ProductCard
                key={product.product_id || i}
                product={product}
                onMessage={handleMessage}
                chatting={chatting}
                delay={Math.min(i * 55, 400)}
              />
            ))
          }
        </div>

        {/* ── Footer links ── */}
        <div style={{ marginTop:"4rem", paddingTop:"2rem", borderTop:"1px solid #daeada", display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
          {[
            { to:"/products", label:"🛒 All Products", bg:"#eaf5ea", color:"#1a5c3a", border:"#c0d9c0" },
            { to:"/cart",     label:"🛍 My Cart",      bg:"#eff6ff", color:"#1d4ed8", border:"#bfdbfe" },
            { to:"/orders",   label:"📦 My Orders",    bg:"#fffbeb", color:"#92400e", border:"#fde68a" },
          ].map(({ to, label, bg, color, border }) => (
            <Link key={to} to={to} style={{
              padding:"10px 22px", borderRadius:12,
              fontSize:13, fontWeight:600, textDecoration:"none",
              background:bg, color, border:`1.5px solid ${border}`,
            }}>
              {label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}