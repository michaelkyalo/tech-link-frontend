import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../farmer/productService";
import { useNavigate } from "react-router-dom";
import useCart from "./usecart";
import { formatCurrency } from "../../utils/helpers";

const EMOJI = {
  Vegetables: "🥬",
  Grains: "🌽",
  Fruits: "🍋",
  Poultry: "🥚",
  Dairy: "🥛",
  default: "🌿",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [added, setAdded] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;

    getProducts()
      .then((data) => {
        if (!mounted) return;
        setProducts(Array.isArray(data) ? data : data.products || []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );

  const filtered = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        p.product_name?.toLowerCase().includes(searchTerm)
    );
  }, [products, cat, search]);

  const handleAdd = (e, product) => {
    e.stopPropagation();

    addToCart(product);
    setAdded(product.product_id);

    setTimeout(() => {
      setAdded(null);
    }, 1500);
  };

  if (loading) {
    return <div style={s.center}>⏳ Loading products...</div>;
  }

  if (error) {
    return (
      <div style={s.center}>
        ❌ Could not load products: {error}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div style={s.center}>
        🌿 No products available yet.
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>🛒 Browse Products</h1>
          <p style={s.sub}>
            {filtered.length} of {products.length} products
          </p>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={s.search}
        />
      </div>

      {/* Categories */}
      <div style={s.filters}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCat(category)}
            style={{
              ...s.filterBtn,
              ...(cat === category ? s.filterActive : {}),
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products */}
      {filtered.length === 0 ? (
        <div style={s.empty}>
          😕 No products match your search.
        </div>
      ) : (
        <div style={s.grid}>
          {filtered.map((product) => (
            <div
              key={product.product_id}
              style={s.card}
              onClick={() =>
                navigate(`/products/${product.product_id}`)
              }
            >
              <div style={s.imgWrap}>
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    style={s.img}
                    loading="lazy"
                  />
                ) : (
                  <div style={s.imgFallback}>
                    {EMOJI[product.category] || EMOJI.default}
                  </div>
                )}
              </div>

              <div style={s.body}>
                {product.category && (
                  <span style={s.catBadge}>
                    {product.category}
                  </span>
                )}

                <h2 style={s.name}>
                  {product.product_name}
                </h2>

                <p style={s.desc}>
                  {product.description?.slice(0, 80) ||
                    "No description available"}
                </p>

                <div style={s.footer}>
                  <span style={s.price}>
                    {formatCurrency(product.price)}
                  </span>

                  <button
                    onClick={(e) => handleAdd(e, product)}
                    style={{
                      ...s.btn,
                      background:
                        added === product.product_id
                          ? "#15803d"
                          : "#16a34a",
                    }}
                  >
                    {added === product.product_id
                      ? "✔ Added"
                      : "+ Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#f9fafb",
    padding: "2rem",
    fontFamily: "'DM Sans', sans-serif",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6b7280",
    fontSize: 16,
    fontFamily: "'DM Sans', sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: "1.5rem",
  },

  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    color: "#14532d",
  },

  sub: {
    margin: "4px 0 0",
    fontSize: 13,
    color: "#6b7280",
  },

  search: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #d1fae5",
    outline: "none",
    minWidth: 240,
    fontSize: 14,
    fontFamily: "inherit",
  },

  filters: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: "1.5rem",
  },

  filterBtn: {
    padding: "8px 16px",
    borderRadius: 999,
    border: "1px solid #d1fae5",
    background: "#fff",
    color: "#374151",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "inherit",
  },

  filterActive: {
    background: "#16a34a",
    color: "#fff",
    border: "1px solid #16a34a",
  },

  empty: {
    textAlign: "center",
    padding: "4rem 1rem",
    color: "#9ca3af",
    fontSize: 15,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 20,
  },

  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform .15s ease, box-shadow .15s ease",
    boxShadow: "0 1px 2px rgba(0,0,0,.05)",
  },

  imgWrap: {
    background: "#f0fdf4",
    height: 180,
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  imgFallback: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 56,
  },

  body: {
    padding: 14,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  catBadge: {
    display: "inline-block",
    width: "fit-content",
    background: "#dcfce7",
    color: "#15803d",
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 999,
  },

  name: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
  },

  desc: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.5,
    color: "#6b7280",
    minHeight: 40,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  price: {
    fontSize: 17,
    fontWeight: 700,
    color: "#16a34a",
  },

  btn: {
    border: "none",
    borderRadius: 8,
    padding: "8px 12px",
    color: "#fff",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
  },
};