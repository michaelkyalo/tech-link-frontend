import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#F7F3EE",
        color: "#1a1a1a",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(145deg, #1B3D2F 0%, #2F5D50 40%, #3D7A65 70%, #1B3D2F 100%);
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
        }

        .hero-blob-1 {
          width: 600px; height: 600px;
          background: #6DBE9A;
          top: -150px; right: -100px;
          animation: float1 8s ease-in-out infinite;
        }

        .hero-blob-2 {
          width: 400px; height: 400px;
          background: #D4A853;
          bottom: -100px; left: -80px;
          animation: float2 10s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(20px) scale(0.95); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 860px;
          padding: 60px 32px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 40px;
          padding: 8px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #A8D8C0;
          margin-bottom: 36px;
          backdrop-filter: blur(10px);
        }

        .hero-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #6DBE9A;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(56px, 9vw, 108px);
          font-weight: 900;
          line-height: 0.95;
          color: #FFFFFF;
          letter-spacing: -3px;
          margin-bottom: 28px;
        }

        .hero-title em {
          font-style: italic;
          color: #89D4AC;
        }

        .hero-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(16px, 2.2vw, 19px);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.65);
          max-width: 560px;
          margin: 0 auto 48px;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
        }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.3px;
          background: #ffffff;
          color: #1B3D2F;
          padding: 16px 38px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(0,0,0,0.2);
        }

        .btn-primary:hover {
          background: #89D4AC;
          color: #1B3D2F;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .btn-secondary {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 15px;
          background: transparent;
          color: #ffffff;
          padding: 16px 38px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.35);
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .btn-secondary:hover {
          border-color: #89D4AC;
          color: #89D4AC;
          transform: translateY(-2px);
        }

        /* Stats bar */
        .stats-bar {
          background: #ffffff;
          border-bottom: 1px solid #e8e0d5;
          padding: 28px 32px;
        }

        .stats-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 24px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 700;
          color: #2F5D50;
          line-height: 1;
        }

        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #8a7f74;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-top: 5px;
        }

        .stat-divider {
          width: 1px;
          background: #e8e0d5;
          align-self: stretch;
        }

        /* Features */
        .features-section {
          padding: 100px 32px;
          background: #F7F3EE;
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #2F5D50;
          text-align: center;
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 700;
          text-align: center;
          color: #1B3D2F;
          line-height: 1.15;
          margin-bottom: 64px;
        }

        .features-grid {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .feature-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 44px 36px;
          border: 1px solid #e8e0d5;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2F5D50, #89D4AC);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(47, 93, 80, 0.12);
          border-color: transparent;
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-icon {
          width: 60px; height: 60px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 28px;
        }

        .icon-green { background: #E8F5EE; }
        .icon-earth { background: #F5EDE0; }
        .icon-sky { background: #E5F0FF; }

        .feature-card h2 {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #1B3D2F;
          margin-bottom: 14px;
        }

        .feature-card p {
          font-family: 'DM Sans', sans-serif;
          font-size: 15.5px;
          color: #6b6560;
          line-height: 1.75;
        }

        .feature-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #2F5D50;
          text-decoration: none;
          margin-top: 24px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: gap 0.2s ease;
        }

        .feature-link:hover { gap: 10px; }

        /* CTA */
        .cta-section {
          margin: 0 32px 80px;
          border-radius: 32px;
          background: linear-gradient(135deg, #1B3D2F 0%, #2F5D50 50%, #3a6b5a 100%);
          padding: 80px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .cta-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #89D4AC;
          margin-bottom: 20px;
        }

        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .cta-title em {
          font-style: italic;
          color: #89D4AC;
        }

        .cta-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          max-width: 520px;
          margin: 0 auto 44px;
          line-height: 1.7;
        }

        .cta-buttons {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }

        .btn-cta-primary {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 15px;
          background: #89D4AC;
          color: #1B3D2F;
          padding: 17px 40px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(137, 212, 172, 0.3);
        }

        .btn-cta-primary:hover {
          background: #a8dfbf;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(137, 212, 172, 0.4);
        }

        .btn-cta-secondary {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 15px;
          background: transparent;
          color: rgba(255,255,255,0.8);
          padding: 17px 40px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.25);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-cta-secondary:hover {
          border-color: rgba(255,255,255,0.6);
          color: #fff;
        }

        /* Footer strip */
        .footer-strip {
          background: #1B3D2F;
          padding: 24px 32px;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }

        @media (max-width: 600px) {
          .stat-divider { display: none; }
          .cta-section { margin: 0 16px 60px; padding: 60px 28px; }
          .hero-title { letter-spacing: -1.5px; }
        }
      `}</style>

    
      <section className="hero-section">
        <div className="hero-noise" />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />

        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Fresh &amp; Local
          </div>

          <h1 className="hero-title">
            Agri<em>Link</em>
          </h1>

          <p className="hero-subtitle">
            A modern agricultural marketplace connecting farmers and buyers
            directly — for fresh, affordable, and high-quality farm products.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
            <Link to="/register" className="btn-secondary">
              Create Account →
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <p className="section-label">How It Works</p>
        <h2 className="section-title">
          Built for every step<br />of the supply chain
        </h2>

        <div className="features-grid">
          {/* Farmers */}
          <div className="feature-card">

            <h2>Farmers</h2>
            <p>
              List your produce, set your prices, and sell directly to buyers —
              no middlemen taking your margin. Grow your business on your terms.
            </p>
            <a href="#" className="feature-link">Learn more →</a>
          </div>

          {/* Buyers */}
          <div className="feature-card">
            
            <h2>Buyers</h2>
            <p>
              Browse farm-fresh products sourced directly from verified local
              farmers. Guaranteed quality at fair, transparent prices.
            </p>
            <a href="#" className="feature-link">Learn more →</a>
          </div>

        
          <div className="feature-card">
            
            <h2>Fast Delivery</h2>
            <p>
              Our logistics network ensures your order arrives fresh and on time
              — from farm gate to your doorstep within 24 hours.
            </p>
            <a href="#" className="feature-link">Learn more →</a>
          </div>
        </div>
      </section>

    
      <section className="cta-section">
        <p className="cta-label">Join the movement</p>
        <h2 className="cta-title">
          Start trading<br /><em>today.</em>
        </h2>
        <p className="cta-sub">
          Join thousands of farmers and buyers already building a smarter,
          more connected agricultural marketplace.
        </p>
        </section>

      <div className="footer-strip">
        © 2026 AgriLink · Connecting farms to tables
      </div>
    </div>
  );
};

export default Home;