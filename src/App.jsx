import { useState, useEffect } from "react";

const COLORS = {
  primary: "#0a3d62",
  primaryDark: "#051e31",
  primaryLight: "#1a6fa0",
  accent: "#f0a500",
  accentDark: "#c87800",
  white: "#ffffff",
  gray100: "#f4f6f8",
  gray200: "#e0e6ed",
  gray600: "#6b7a8d",
  gray800: "#2d3748",
  text: "#1a202c",
  textLight: "#4a5568",
  success: "#27ae60",
  danger: "#e74c3c",
};

const NAV_LINKS = [
  { label: "Inicio", id: "inicio" },
  { label: "Productos", id: "productos" },
  { label: "Categorías", id: "categorias" },
  { label: "Ofertas", id: "ofertas" },
  { label: "Nosotros", id: "nosotros" },
  { label: "Contacto", id: "contacto" },
];

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Caña Telescópica Pro 6m",
    precio: 89.99,
    precioAnterior: 120.0,
    categoria: "Cañas",
    rating: 4.8,
    reviews: 124,
    imagen: "https://via.placeholder.com/300x300/0a3d62/ffffff?text=Caña+Pro",
    badge: "Más vendido",
    badgeColor: COLORS.accent,
    descripcion: "Caña telescópica de fibra de carbono, ideal para pesca en ríos y embalses.",
  },
  {
    id: 2,
    nombre: "Carrete Spinning 4000",
    precio: 64.5,
    precioAnterior: null,
    categoria: "Carretes",
    rating: 4.6,
    reviews: 89,
    imagen: "https://via.placeholder.com/300x300/1a6fa0/ffffff?text=Carrete",
    badge: "Nuevo",
    badgeColor: COLORS.success,
    descripcion: "Carrete de alta precisión con 9 rodamientos y freno frontal ajustable.",
  },
  {
    id: 3,
    nombre: "Set de Señuelos Silicona x20",
    precio: 22.99,
    precioAnterior: 34.99,
    categoria: "Señuelos",
    rating: 4.9,
    reviews: 213,
    imagen: "https://via.placeholder.com/300x300/f0a500/ffffff?text=Señuelos",
    badge: "-34%",
    badgeColor: COLORS.danger,
    descripcion: "Pack de 20 señuelos de silicona en colores variados para pesca de depredadores.",
  },
  {
    id: 4,
    nombre: "Chaleco Pesca Multipocket",
    precio: 49.95,
    precioAnterior: null,
    categoria: "Ropa",
    rating: 4.5,
    reviews: 67,
    imagen: "https://via.placeholder.com/300x300/051e31/ffffff?text=Chaleco",
    badge: null,
    badgeColor: null,
    descripcion: "Chaleco técnico con 12 bolsillos, transpirable y resistente al agua.",
  },
  {
    id: 5,
    nombre: "Silla Plegable Ultraligera",
    precio: 37.0,
    precioAnterior: 45.0,
    categoria: "Accesorios",
    rating: 4.7,
    reviews: 155,
    imagen: "https://via.placeholder.com/300x300/27ae60/ffffff?text=Silla",
    badge: "Oferta",
    badgeColor: COLORS.danger,
    descripcion: "Silla plegable de aluminio, 3 kg, soporta hasta 150 kg. Incluye bolsa.",
  },
  {
    id: 6,
    nombre: "Kit Anzuelos Japoneses x50",
    precio: 12.99,
    precioAnterior: null,
    categoria: "Anzuelos",
    rating: 4.4,
    reviews: 302,
    imagen: "https://via.placeholder.com/300x300/c87800/ffffff?text=Anzuelos",
    badge: null,
    badgeColor: null,
    descripcion: "Surtido de anzuelos de acero inoxidable en tamaños 4-14. Alta resistencia.",
  },
  {
    id: 7,
    nombre: "Linea Fluorocarbono 100m",
    precio: 18.5,
    precioAnterior: 25.0,
    categoria: "Líneas",
    rating: 4.6,
    reviews: 178,
    imagen: "https://via.placeholder.com/300x300/6b7a8d/ffffff?text=Línea",
    badge: "-26%",
    badgeColor: COLORS.danger,
    descripcion: "Línea de pesca fluorocarbono 0.30mm, invisible bajo el agua, resistencia 8kg.",
  },
  {
    id: 8,
    nombre: "Caja Portaanzuelos Deluxe",
    precio: 29.99,
    precioAnterior: null,
    categoria: "Accesorios",
    rating: 4.8,
    reviews: 94,
    imagen: "https://via.placeholder.com/300x300/0a3d62/f0a500?text=Caja",
    badge: "Nuevo",
    badgeColor: COLORS.success,
    descripcion: "Caja organizadora con 28 compartimentos ajustables, cierre hermético.",
  },
];

const CATEGORIAS = [
  { nombre: "Cañas", icono: "🎣", cantidad: 48, color: "#0a3d62" },
  { nombre: "Carretes", icono: "🔄", cantidad: 32, color: "#1a6fa0" },
  { nombre: "Señuelos", icono: "🪝", cantidad: 127, color: "#f0a500" },
  { nombre: "Ropa", icono: "🧥", cantidad: 64, color: "#27ae60" },
  { nombre: "Accesorios", icono: "🎒", cantidad: 96, color: "#8e44ad" },
  { nombre: "Anzuelos", icono: "🪝", cantidad: 210, color: "#e74c3c" },
];

const TESTIMONIOS = [
  {
    nombre: "Carlos Martínez",
    ciudad: "Madrid",
    texto: "Excelente tienda, los productos son de primera calidad. La caña telescópica es increíble, ya he sacado varias piezas con ella.",
    rating: 5,
    avatar: "CM",
  },
  {
    nombre: "Ana López",
    ciudad: "Barcelona",
    texto: "Envío rapidísimo y atención al cliente inmejorable. Repito seguro. Los señuelos de silicona funcionan de maravilla.",
    rating: 5,
    avatar: "AL",
  },
  {
    nombre: "Pedro Sánchez",
    ciudad: "Sevilla",
    texto: "Gran variedad de productos y precios competitivos. He encontrado todo lo que necesitaba para mis jornadas de pesca.",
    rating: 4,
    avatar: "PS",
  },
];

function StarRating({ rating, size = 14 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: size,
            color: star <= Math.round(rating) ? "#f0a500" : "#d0d0d0",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ProductCard({ producto, onAddCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddCart(producto);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.white,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 12px 40px rgba(10,61,98,0.18)"
          : "0 2px 12px rgba(10,61,98,0.08)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {producto.badge && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: producto.badgeColor,
            color: COLORS.white,
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 20,
            zIndex: 2,
            letterSpacing: 0.5,
          }}
        >
          {producto.badge}
        </div>
      )}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.primaryLight,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 6,
          }}
        >
          {producto.categoria}
        </span>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: 8,
            lineHeight: 1.3,
          }}
        >
          {producto.nombre}
        </h3>
        <p style={{ fontSize: 12, color: COLORS.textLight, marginBottom: 10, flex: 1, lineHeight: 1.5 }}>
          {producto.descripcion}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <StarRating rating={producto.rating} />
          <span style={{ fontSize: 12, color: COLORS.gray600 }}>
            ({producto.reviews})
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: COLORS.primary }}>
            €{producto.precio.toFixed(2)}
          </span>
          {producto.precioAnterior && (
            <span
              style={{
                fontSize: 14,
                color: COLORS.gray600,
                textDecoration: "line-through",
              }}
            >
              €{producto.precioAnterior.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          style={{
            background: added ? COLORS.success : COLORS.accent,
            color: COLORS.white,
            border: "none",
            borderRadius: 8,
            padding: "10px 16px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {added ? "✓ Añadido" : "🛒 Añadir al carrito"}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [contactForm, setContactForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const addToCart = (producto) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === producto.id);
      if (exists) {
        return prev.map((i) =>
          i.id === producto.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...producto, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const cartTotal = cartItems.reduce((acc, i) => acc + i.precio * i.qty, 0);
  const cartCount = cartItems.reduce((acc, i) => acc + i.qty, 0);

  const productosFiltrados =
    filtroCategoria === "Todos"
      ? PRODUCTOS
      : PRODUCTOS.filter((p) => p.categoria === filtroCategoria);

  const handleFormChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO: Enviar formulario a backend o servicio de email
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
    setContactForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", color: COLORS.text, background: COLORS.gray100, minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled
            ? "rgba(5, 30, 49, 0.97)"
            : "rgba(10, 61, 98, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 70,
          }}
        >
          {/* Logo */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
            onClick={() => scrollTo("inicio")}
          >
            <span style={{ fontSize: 28 }}>🎣</span>
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: COLORS.white,
                  letterSpacing: 1,
                  lineHeight: 1.1,
                }}
              >
                AURA<span style={{ color: COLORS.accent }}>PESCA</span>
              </div>
              <div style={{ fontSize: 9, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase" }}>
                Tu tienda de confianza
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: activeSection === link.id ? "rgba(240,165,0,0.15)" : "transparent",
                  border: "none",
                  color: activeSection === link.id ? COLORS.accent : COLORS.white,
                  fontWeight: activeSection === link.id ? 700 : 500,
                  fontSize: 14,
                  padding: "8px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(240,165,0,0.15)";
                  e.currentTarget.style.color = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    activeSection === link.id ? "rgba(240,165,0,0.15)" : "transparent";
                  e.currentTarget.style.color =
                    activeSection === link.id ? COLORS.accent : COLORS.white;
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Cart & Menu */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setCartOpen(!cartOpen)}
              style={{
                background: COLORS.accent,
                border: "none",
                borderRadius: 10,
                padding: "8px 14px",
                color: COLORS.white,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                position: "relative",
              }}
            >
              🛒
              {cartCount > 0 && (
                <span
                  style={{
                    background: COLORS.danger,
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    fontSize: 10,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
              <span style={{ display: cartCount > 0 ? "inline" : "none" }}>
                €{cartTotal.toFixed(2)}
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: 8,
                padding: "8px 10px",
                color: COLORS.white,
                fontSize: 18,
                cursor: "pointer",
                display: "none",
              }}
              className="mobile-menu-btn"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              background: COLORS.primaryDark,
              padding: "12px 24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: COLORS.white,
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "10px 0",
                  textAlign: "left",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* CART SIDEBAR */}
      {cartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            width: 360,
            maxWidth: "90vw",
            background: COLORS.white,
            boxShadow: "-8px 0 40px rgba(0,0,0,0.2)",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: COLORS.primary,
              padding: "20px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ color: COLORS.white, fontSize: 18, fontWeight: 800 }}>
              🛒 Carrito ({cartCount})
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: COLORS.white,
                borderRadius: 8,
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              ✕
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            {cartItems.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: COLORS.textLight,
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
                <p style={{ fontSize: 16, fontWeight: 600 }}>Tu carrito está vacío</p>
                <p style={{ fontSize: 13, marginTop: 8 }}>
                  Añade productos para empezar
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "12px 0",
                    borderBottom: `1px solid ${COLORS.gray200}`,
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover" }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
                      {item.nombre}
                    </p>
                    <p style={{ fontSize: 12, color: COLORS.textLight }}>
                      x{item.qty} — €{(item.precio * item.qty).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: COLORS.danger,
                      cursor: "pointer",
                      fontSize: 16,
                      padding: 4,
                    }}
                  >
                    🗑
                  </button>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div style={{ padding: 16, borderTop: `2px solid ${COLORS.gray200}` }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  fontSize: 16,
                  fontWeight: 800,
                  color: COLORS.primary,
                }}
              >
                <span>Total</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <button
                style={{
                  width: "100%",
                  background: COLORS.accent,
                  color: COLORS.white,
                  border: "none",
                  borderRadius: 10,
                  padding: "14px",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  letterSpacing: 0.5,
                }}
                onClick={() => {
                  // TODO: Integrar pasarela de pago (Stripe, PayPal, etc.)
                  alert("Funcionalidad de pago pendiente de integración");
                }}
              >
                💳 Finalizar compra
              </button>
            </div>
          )}
        </div>
      )}

      {/* Overlay carrito */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1999,
          }}
        />
      )}

      {/* HERO */}
      <section
        id="inicio"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 70,
        }}
      >
        {/* Decoración fondo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(240,165,0,0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(26,111,160,0.3) 0%, transparent 50%)
            `,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: "rgba(10,61,98,0.3)",
            clipPath: "polygon(0 60%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
          className="hero-grid"
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(240,165,0,0.15)",
                border: `1px solid rgba(240,165,0,0.3)`,
                borderRadius: 20,
                padding: "6px 16px",
                marginBottom: 24,
              }}
            >
              <span style={{ fontSize: 12 }}>✨</span>
              <span style={{ fontSize: 13, color: COLORS.accent, fontWeight: 600 }}>
                Temporada de pesca 2024 abierta
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 58px)",
                fontWeight: 900,
                color: COLORS.white,
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              Todo lo que necesitas para{" "}
              <span style={{ color: COLORS.accent }}>pescar</span> a lo grande
            </h1>
            <p
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              En Replica AuraPes encontrarás el mejor equipamiento de pesca: cañas,
              carretes, señuelos y mucho más. Calidad profesional al mejor precio.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo("productos")}
                style={{
                  background: COLORS.accent,
                  color: COLORS.white,
                  border: "none",
                  borderRadius: 12,
                  padding: "16px 32px",
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(240,165,0,0.4)",
                  transition: "all 0.3s ease",
                  letterSpacing: 0.5,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(240,165,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(240,165,0,0.4)";
                }}
              >
                🎣 Ver productos
              </button>
              <button
                onClick={() => scrollTo("categorias")}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: COLORS.white,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: 12,
                  padding: "16px 32px",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                }}
              >
                📦 Categorías
              </button>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: 32,
                marginTop: 48,
                flexWrap: "wrap",
              }}
            >
              {[
                { valor: "+500", label: "Productos" },
                { valor: "12K+", label: "Clientes" },
                { valor: "4.9★", label: "Valoración" },
                { valor: "24h", label: "Envío rápido" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: COLORS.accent,
                      lineHeight: 1,
                    }}
                  >
                    {stat.valor}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image side */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="hero-img"
          >
            <div
              style={{
                width: 380,
                height: 380,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "2px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background: "rgba(240,165,0,0.1)",
                  border: "2px solid rgba(240,165,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 120,
                }}
              >
                🎣
              </div>
              {/* Floating badges */}
              {[
                { top: "5%", left: "10%", text: "🐟 Pesca deportiva", delay: "0s" },
                { top: "15%", right: "0%", text: "⭐ Top calidad", delay: "0.5s" },
                { bottom: "20%", left: "0%", text: "🚚 Envío 24h", delay: "1s" },
                { bottom: "5%", right: "10%", text: "💯 Garantía", delay: "1.5s" },
              ].map((badge, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: badge.top,
                    left: badge.left,
                    right: badge.right,
                    bottom: badge.bottom,
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 20,
                    padding: "6px 14px",
                    fontSize: 11,
                    fontWeight: 600,
                    color: COLORS.white,
                    whiteSpace: "nowrap",
                    animation: `float 3s ease-in-out ${badge.delay} infinite`,
                  }}
                >
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BANNER OFERTAS */}
      <div
        style={{
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
          padding: "14px 24px",
          textAlign: "center",
          color: COLORS.white,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 0.5,
        }}
      >
        🔥 ¡Envío GRATIS en pedidos superiores a €59! | Usa el código:{" "}
        <span
          style={{
            background: "rgba(255,255,255,0.2)",
            padding: "2px 10px",
            borderRadius: 6,
            fontFamily: "monospace",
            letterSpacing: 2,
          }}
        >
          PESCA10
        </span>{" "}
        para un 10% de descuento 🎣
      </div>

      {/* CATEGORÍAS */}
      <section id="categorias" style={{ padding: "80px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.accent,
                textTransform: "uppercase",
                letterSpacing: 3,
                display: "block",
                marginBottom: 12,
              }}
            >
              Explora
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900,
                color: COLORS.primary,
                marginBottom: 16,
              }}
            >
              Categorías principales
            </h2>
            <p style={{ fontSize: 16, color: COLORS.textLight, maxWidth: 500, margin: "0 auto" }}>
              Encuentra todo lo que necesitas para tu jornada de pesca perfecta
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 20,
            }}
          >
            {CATEGORIAS.map((cat) => (
              <CategoryCard
                key={cat.nombre}
                cat={cat}
                onClick={() => {
                  setFiltroCategoria(cat.nombre);
                  scrollTo("productos");
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" style={{ padding: "80px 24px", background: COLORS.gray100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.accent,
                textTransform: "uppercase",
                letterSpacing: 3,
                display: "block",
                marginBottom: 12,
              }}
            >
              Catálogo
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900,
                color: COLORS.primary,
                marginBottom: 16,
              }}
            >
              Nuestros productos
            </h2>
            <p style={{ fontSize: 16, color: COLORS.textLight, maxWidth: 500, margin: "0 auto" }}>
              Calidad profesional para pescadores de todos los niveles
            </p>
          </div>

          {/* Filtros */}
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            {["Todos", ...CATEGORIAS.map((c) => c.nombre)].map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                style={{
                  background: filtroCategoria === cat ? COLORS.primary : COLORS.white,
                  color: filtroCategoria === cat ? COLORS.white : COLORS.text,
                  border: `2px solid ${filtroCategoria === cat ? COLORS.primary : COLORS.gray200}`,
                  borderRadius: 24,
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (filtroCategoria !== cat) {
                    e.currentTarget.style.borderColor = COLORS.primary;
                    e.currentTarget.style.color = COLORS.primary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (filtroCategoria !== cat) {
                    e.currentTarget.style.borderColor = COLORS.gray200;
                    e.currentTarget.style.color = COLORS.text;
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} onAddCart={addToCart} />
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: COLORS.textLight }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p style={{ fontSize: 18, fontWeight: 700 }}>No hay productos en esta categoría</p>
            </div>
          )}
        </div>
      </section>

      {/* OFERTAS / BANNER */}
      <section
        id="ofertas"
        style={{
          padding: "80px 24px",
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(240,165,0,0.08)",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              alignItems: "center",
            }}
            className="ofertas-grid"
          >
            <div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.accent,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  display: "block",
                  marginBottom: 12,
                }}
              >
                🔥 Oferta especial
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 900,
                  color: COLORS.white,
                  marginBottom: 20,
                  lineHeight: 1.2,
                }}
              >
                Kit iniciación pesca completo
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: 28,
                  lineHeight: 1.7,
                }}
              >
                Incluye caña telescópica 4m, carrete, hilo, anzuelos surtidos y caja organizadora.
                Todo lo que necesitas para empezar a pescar hoy mismo.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                <div>
                  <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.accent }}>
                    €79.99
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "line-through",
                    }}
                  >
                    €129.95
                  </div>
                </div>
                <div
                  style={{
                    background: COLORS.danger,
                    color: COLORS.white,
                    borderRadius: 12,
                    padding: "8px 16px",
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  -38%
                </div>
              </div>
              <button
                onClick={() =>
                  addToCart({
                    id: 99,
                    nombre: "Kit iniciación pesca completo",
                    precio: 79.99,
                    imagen: "https://via.placeholder.com/300x300/f0a500/ffffff?text=Kit",
                  })
                }
                style={{
                  background: COLORS.accent,
                  color: COLORS.white,
                  border: "none",
                  borderRadius: 12,
                  padding: "16px 36px",
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(240,165,0,0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                🛒 Añadir al carrito
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                { icono: "🎣", titulo: "Caña 4m", desc: "Fibra de carbono" },
                { icono: "🔄", titulo: "Carrete", desc: "6 rodamientos" },
                { icono: "🪝", titulo: "Anzuelos x30", desc: "Surtido premium" },
                { icono: "📦", titulo: "Caja organiz.", desc: "20 compartimentos" },
              ].map((item) => (
                <div
                  key={item.titulo}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: "20px 16px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icono}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, marginBottom: 4 }}>
                    {item.titulo}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section style={{ padding: "80px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.accent,
                textTransform: "uppercase",
                letterSpacing: 3,
                display: "block",
                marginBottom: 12,
              }}
            >
              Reseñas
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900,
                color: COLORS.primary,
              }}
            >
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {TESTIMONIOS.map((t, i) => (
              <TestimonioCard key={i} testimonio={t} />
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section
        id="nosotros"
        style={{
          padding: "80px 24px",
          background: COLORS.gray100,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              alignItems: "center",
            }}
            className="nosotros-grid"
          >
            <div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.accent,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  display: "block",
                  marginBottom: 12,
                }}
              >
                Sobre nosotros
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 900,
                  color: COLORS.primary,
                  marginBottom: 20,
                  lineHeight: 1.2,
                }}
              >
                Apasionados por la pesca desde 2010
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: COLORS.textLight,
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                En Replica AuraPes somos pescadores antes que comerciantes. Conocemos de primera
                mano lo que un pescador necesita, y por eso seleccionamos personalmente cada
                producto que ofrecemos en nuestra tienda.
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: COLORS.textLight,
                  lineHeight: 1.8,
                  marginBottom: 36,
                }}
              >
                Nuestro equipo de expertos está siempre disponible para asesorarte y
                ayudarte a encontrar el equipo perfecto para tu estilo de pesca.
              </p>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
              >
                {[
                  { icono: "🏆", titulo: "14 años de experiencia", desc: "En el sector de la pesca" },
                  { icono: "🤝", titulo: "Atención personalizada", desc: "Te asesoramos sin compromiso" },
                  { icono: "🚚", titulo: "Envíos rápidos", desc: "24-48h en toda España" },
                  { icono: "↩️", titulo: "Devoluciones fáciles", desc: "30 días de garantía" },
                ].map((item) => (
                  <div
                    key={item.titulo}
                    style={{
                      background: COLORS.white,
                      borderRadius: 12,
                      padding: "16px",
                      boxShadow: "0 2px 12px rgba(10,61,98,0.06)",
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icono}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.primary, marginBottom: 4 }}>
                      {item.titulo}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textLight }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                borderRadius: 20,
                padding: 48,
                textAlign: "center",
                color: COLORS.white,
              }}
            >
              <div style={{ fontSize: 80, marginBottom: 24 }}>🎣</div>
              <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>
                ¿Primera vez pescando?
              </h3>
              <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.7, marginBottom: 28 }}>
                Nuestros expertos te guiarán en cada paso. Desde elegir la caña correcta
                hasta los mejores cebos para cada especie.
              </p>
              <button
                onClick={() => scrollTo("contacto")}
                style={{
                  background: COLORS.accent,
                  color: COLORS.white,
                  border: "none",
                  borderRadius: 10,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                📞 Consúltanos gratis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        style={{ padding: "80px 24px", background: COLORS.white }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.accent,
                textTransform: "uppercase",
                letterSpacing: 3,
                display: "block",
                marginBottom: 12,
              }}
            >
              Contacto
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900,
                color: COLORS.primary,
                marginBottom: 16,
              }}
            >
              ¿Tienes alguna pregunta?
            </h2>
            <p style={{ fontSize: 16, color: COLORS.textLight }}>
              Estamos aquí para ayudarte. Escríbenos y te respondemos en menos de 24h.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: 40,
              alignItems: "start",
            }}
            className="contacto-grid"
          >
            {/* Info contacto */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icono: "📧", titulo: "Email", valor: "info@aurapesca.com" },
                { icono: "📞", titulo: "Teléfono", valor: "+34 900 123 456" },
                { icono: "📍", titulo: "Dirección", valor: "Calle Pesca, 12, Madrid" },
                { icono: "🕐", titulo: "Horario", valor: "Lun-Vie: 9h-19h" },
              ].map((item) => (
                <div
                  key={item.titulo}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    background: COLORS.gray100,
                    borderRadius: 12,
                    padding: "16px",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{item.icono}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textLight, marginBottom: 2 }}>
                      {item.titulo}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>
                      {item.valor}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Formulario */}
            <form onSubmit={handleFormSubmit}>
              <div
                style={{
                  background: COLORS.gray100,
                  borderRadius: 16,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {formSent && (
                  <div
                    style={{
                      background: "#d4edda",
                      border: "1px solid #27ae60",
                      borderRadius: 10,
                      padding: "14px 20px",
                      color: "#155724",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    ✅ ¡Mensaje enviado! Te responderemos en breve.
                  </div>
                )}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.text,
                      marginBottom: 8,
                    }}
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={contactForm.nombre}
                    onChange={handleFormChange}
                    required
                    placeholder="Tu nombre"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: `2px solid ${COLORS.gray200}`,
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: COLORS.white,
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                    onBlur={(e) => (e.target.style.borderColor = COLORS.gray200)}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.text,
                      marginBottom: 8,
                    }}
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleFormChange}
                    required
                    placeholder="tu@email.com"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: `2px solid ${COLORS.gray200}`,
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: COLORS.white,
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                    onBlur={(e) => (e.target.style.borderColor = COLORS.gray200)}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.text,
                      marginBottom: 8,
                    }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    value={contactForm.mensaje}
                    onChange={handleFormChange}
                    required
                    rows={5}
                    placeholder="¿En qué podemos ayudarte?"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: `2px solid ${COLORS.gray200}`,
                      fontSize: 14,
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                      background: COLORS.white,
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                    onBlur={(e) => (e.target.style.borderColor = COLORS.gray200)}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: COLORS.primary,
                    color: COLORS.white,
                    border: "none",
                    borderRadius: 10,
                    padding: "14px",
                    fontSize: 15,
                    fontWeight: 800,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    letterSpacing: 0.5,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = COLORS.primaryLight;
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = COLORS.primary;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  📨 Enviar mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: COLORS.primaryDark,
          color: "rgba(255,255,255,0.7)",
          padding: "60px 24px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 40,
              marginBottom: 48,
            }}
            className="footer-grid"
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>🎣</span>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: COLORS.white }}>
                    AURA<span style={{ color: COLORS.accent }}>PESCA</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
                Tu tienda especializada en material de pesca. Más de 500 productos para
                pescadores de todos los niveles.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {["Facebook", "Instagram", "YouTube"].map((red) => (
                  <a
                    key={red}
                    href="#"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: COLORS.white,
                      borderRadius: 8,
                      padding: "8px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(240,165,0,0.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
                    }
                  >
                    {red}
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                titulo: "Tienda",
                links: ["Productos", "Ofertas", "Novedades", "Marcas"],
              },
              {
                titulo: "Información",
                links: ["Sobre nosotros", "Blog de pesca", "Envíos", "Devoluciones"],
              },
              {
                titulo: "Legal",
                links: ["Aviso legal", "Privacidad", "Cookies", "Términos"],
              },
            ].map((col) => (
              <div key={col.titulo}>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: COLORS.white,
                    marginBottom: 16,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {col.titulo}
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          textDecoration: "none",
                          fontSize: 14,
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accent)}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                        }
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p style={{ fontSize: 13 }}>
              © 2024 Replica AuraPes. Todos los derechos reservados.
            </p>
            <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
              <span>💳 Visa</span>
              <span>💳 Mastercard</span>
              <span>🅿️ PayPal</span>
              <span>🚚 Correos Express</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <ScrollToTop />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-img { display: none !important; }
          .ofertas-grid { grid-template-columns: 1fr !important; }
          .nosotros-grid { grid-template-columns: 1fr !important; }
          .contacto-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

function CategoryCard({ cat, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? cat.color : COLORS.white,
        border: `2px solid ${hovered ? cat.color : COLORS.gray200}`,
        borderRadius: 16,
        padding: "28px 16px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 12px 32px rgba(0,0,0,0.15)`
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }}>{cat.icono}</div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: hovered ? COLORS.white : COLORS.text,
          marginBottom: 6,
          transition: "color 0.3s",
        }}
      >
        {cat.nombre}
      </div>
      <div
        style={{
          fontSize: 12,
          color: hovered ? "rgba(255,255,255,0.7)" : COLORS.textLight,
          transition: "color 0.3s",
        }}
      >
        {cat.cantidad} productos
      </div>
    </div>
  );
}

function TestimonioCard({ testimonio }) {
  return (
    <div
      style={{
        background: COLORS.gray100,
        borderRadius: 16,
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <StarRating rating={testimonio.rating} size={18} />
      <p style={{ fontSize: 15, color: COLORS.text, lineHeight: 1.7, fontStyle: "italic" }}>
        "{testimonio.texto}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 800,
            color: COLORS.white,
            flexShrink: 0,
          }}
        >
          {testimonio.avatar}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>
            {testimonio.nombre}
          </div>
          <div style={{ fontSize: 12, color: COLORS.textLight }}>{testimonio.ciudad}</div>
        </div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: COLORS.primary,
        color: COLORS.white,
        border: "none",
        fontSize: 20,
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(10,61,98,0.3)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = COLORS.accent;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = COLORS.primary;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      ↑
    </button>
  );
}