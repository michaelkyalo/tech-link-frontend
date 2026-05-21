import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background: #f7f3ee;
        }

        .home-container {
          min-height: 100vh;
          background: #f7f3ee;
          padding: 0 80px;
        }

        /* HERO SECTION */
        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          min-height: 85vh;
        }

        .hero-left {
          flex: 1;
        }

        .hero-title {
          font-size: 70px;
          line-height: 1.1;
          color: #1f3d2b;
          font-weight: 700;
          margin-bottom: 25px;
        }

        .hero-text {
          font-size: 18px;
          color: #555;
          line-height: 1.8;
          margin-bottom: 40px;
          max-width: 550px;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .primary-btn {
          background: #2f5d50;
          color: white;
          padding: 16px 35px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          transition: 0.3s;
        }

        .primary-btn:hover {
          background: #23463b;
        }

        .secondary-btn {
          border: 2px solid #2f5d50;
          color: #2f5d50;
          padding: 14px 35px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          transition: 0.3s;
        }

        .secondary-btn:hover {
          background: #2f5d50;
          color: white;
        }

        /* HERO IMAGE */
        .hero-right {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .hero-image {
          width: 100%;
          max-width: 550px;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* RESPONSIVE */
        @media(max-width: 992px) {
          .home-container {
            padding: 0 30px;
          }

          .hero {
            flex-direction: column;
            text-align: center;
            padding-bottom: 60px;
          }

          .hero-text {
            margin: auto;
            margin-bottom: 40px;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-title {
            font-size: 52px;
          }
        }

        @media(max-width: 768px) {
          .hero-title {
            font-size: 42px;
          }

          .hero-text {
            font-size: 16px;
          }
        }

        /* FEATURES SECTION */
        .features-section {
          padding: 80px 0;
          text-align: center;
        }

        .section-title {
          font-size: 42px;
          line-height: 1.2;
          color: #1f3d2b;
          font-weight: 700;
          margin-bottom: 50px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .feature-card {
          background: white;
          padding: 40px 30px;
          border-radius: 20px;
          text-align: left;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .feature-card h2 {
          font-size: 22px;
          color: #1f3d2b;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .feature-card p {
          color: #555;
          line-height: 1.7;
          margin-bottom: 24px;
          font-size: 15px;
        }

        /* CTA SECTION */
        .cta-section {
          background: #1f3d2b;
          color: white;
          padding: 80px 60px;
          border-radius: 30px;
          text-align: center;
          margin: 60px 0;
        }

        .cta-title {
          font-size: 48px;
          line-height: 1.1;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .cta-sub {
          max-width: 520px;
          margin: 0 auto 30px;
          font-size: 17px;
          line-height: 1.7;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          background: white;
          color: #1f3d2b;
          padding: 14px 32px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .cta-btn:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
        }

        .cta-btn.farmer {
          background: #5c8d63;
          color: white;
        }

        .cta-btn.farmer:hover {
          background: #4a744f;
        }

        /* FOOTER STRIP */
        .footer-strip {
          text-align: center;
          padding: 30px 0;
          color: #777;
          font-size: 14px;
          border-top: 1px solid #e0d9cf;
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            Connect Farmers
            Directly to Buyers
          </h1>

          <p className="hero-text">
            AgriLink bridges the gap between rural harvests and urban kitchens.
            Empowering local producers with fair market access and
            transparent logistics for a sustainable future.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Get Started
            </Link>
            <Link to="/login" className="secondary-btn">
              Learn More
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop"
              alt="Farm"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2 className="section-title">Cultivate Trust, Digitally</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h2>Multiplayer Trade</h2>
            <p>
              Group-buy mechanics allow urban communities to pool resources
              for wholesale prices while providing farmers with guaranteed bulk orders.
            </p>
          </div>

          <div className="feature-card">
            <h2>Fair Pricing</h2>
            <p>
              Our algorithmic pricing ensures farmers get a living wage by removing
              predatory middlemen and reflecting real-time market value.
            </p>
          </div>

          <div className="feature-card">
            <h2>Loyal Rewards</h2>
            <p>
              Earn 'Root' tokens for every organic purchase, redeemable for seasonal
              exclusives or to fund regenerative soil health initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to join the Ecosystem?</h2>
        <p className="cta-sub">
          Whether you're a producer seeking fair value or a buyer seeking premium
          freshness, AgriLink is your digital homestead.
        </p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-btn farmer">
            I'm a Farmer
          </Link>
          <Link to="/register" className="cta-btn">
            I'm a Buyer
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <div className="footer-strip">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontWeight: 600, color: '#1f3d2b', marginBottom: '4px' }}>AgriLink</div>
            © 2026 AgriLink Marketplace · Rooted in Transparency
          </div>
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
            <a href="#" style={{ color: '#555', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#555', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: '#555', textDecoration: 'none' }}>Farmer Support</a>
            <a href="#" style={{ color: '#555', textDecoration: 'none' }}>Buyer FAQ</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;