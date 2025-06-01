"use client"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { User } from "./user";
import Auth from "./auth";

export default function HomePage() {
    const navigate = useNavigate();
    // const initialUser: User = {
    //     id: '',
    //     name: '',
    //     email: '',
    //     password: '',

    // }
    const [isLogin, setIsLogin] = useState(false);
    console.log('isLogin', isLogin);
    
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [type, setType] = useState('Login');
           const handleLoginSuccess = () => {
            setIsLogin((prev) => {
                if (!prev) setIsLoginOpen(false);
                return !prev;
            });
            navigate('/navBar'); // Redirect to home page after login
        }
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #f0f4f8, #ffffff)",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    header: {
      borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      position: "sticky" as const,
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    headerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "1rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerActions: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    btnBase: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    btnPrimary: {
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      color: "white",
      boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
    },
    btnGhost: {
      background: "transparent",
      color: "#6b7280",
    },
    btnOutline: {
      background: "transparent",
      color: "#1a1a1a",
      border: "1px solid #e5e7eb",
    },
    btnLarge: {
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
    },
    heroSection: {
      padding: "5rem 1.5rem",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)",
      position: "relative" as const,
      overflow: "hidden",
    },
    heroBg: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.5,
      backgroundImage:
        "radial-gradient(circle at 25px 25px, #e6f7ff 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e6f7ff 2%, transparent 0%)",
      backgroundSize: "100px 100px",
      zIndex: 0,
    },
    heroContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative" as const,
      zIndex: 1,
    },
    heroGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "4rem",
      alignItems: "center",
    },
    heroTitle: {
      fontSize: "3.5rem",
      fontWeight: "700",
      lineHeight: "1.1",
      marginBottom: "1.5rem",
      color: "#1a1a1a",
    },
    heroTitleAccent: {
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    heroDescription: {
      fontSize: "1.25rem",
      color: "#4b5563",
      marginBottom: "2rem",
      lineHeight: "1.6",
    },
    heroButtons: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap" as const,
    },
    heroVisual: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    floatingCards: {
      position: "relative" as const,
      width: "300px",
      height: "300px",
    },
    floatingCard: {
      position: "absolute" as const,
      borderRadius: "1.5rem",
      background: "white",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      animation: "float 6s ease-in-out infinite",
    },
    card1: {
      width: "200px",
      height: "200px",
      top: "50px",
      left: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
      animationDelay: "0s",
    },
    card2: {
      width: "80px",
      height: "80px",
      top: "20px",
      right: "20px",
      background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
      animationDelay: "2s",
    },
    card3: {
      width: "60px",
      height: "60px",
      bottom: "20px",
      left: "20px",
      background: "linear-gradient(135deg, #f3e8ff, #e9d5ff)",
      animationDelay: "4s",
    },
    featuresSection: {
      padding: "4rem 1.5rem",
      background: "#ffffff",
    },
    featuresContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center" as const,
    },
    sectionBadge: {
      display: "inline-block",
      padding: "0.25rem 0.75rem",
      background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)",
      color: "#4338ca",
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase" as const,
      letterSpacing: "0.05em",
      borderRadius: "9999px",
      marginBottom: "1rem",
      boxShadow: "0 2px 4px rgba(99, 102, 241, 0.1)",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1a1a1a",
      marginBottom: "1rem",
    },
    sectionDescription: {
      fontSize: "1.125rem",
      color: "#4b5563",
      maxWidth: "600px",
      margin: "0 auto 3rem auto",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },
    featureCard: {
      background: "white",
      borderRadius: "1rem",
      padding: "2rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      border: "1px solid #e5e7eb",
    },
    featureIcon: {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      marginBottom: "1rem",
    },
    featureTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1a1a1a",
      marginBottom: "0.5rem",
    },
    featureDescription: {
      color: "#6b7280",
      lineHeight: "1.6",
    },
    footer: {
      padding: "3rem 1.5rem",
      borderTop: "1px solid #e5e7eb",
      background: "white",
      textAlign: "center" as const,
    },
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; text-align: center; }
            .hero-title { font-size: 2.5rem !important; }
            .hero-buttons { justify-content: center; }
            .features-grid { grid-template-columns: 1fr !important; }
          }
        `}
      </style>
       <header style={styles.header}>
       
      </header>

      {isLoginOpen && (
        <Auth
          successLogin={handleLoginSuccess}
          typeAction={type}
          close={() => setIsLoginOpen(false)}
        />
      )}

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroBg}></div>
        <div style={styles.heroContent}>
          <div style={styles.heroGrid} className="hero-grid">
            <div>
              <h1 style={styles.heroTitle} className="hero-title">
                מערכת שיעורים
                <br />
                <span style={styles.heroTitleAccent}>חכמה ומבוססת AI</span>
              </h1>
              <p style={styles.heroDescription}>
                מצא את השיעור המושלם עבורך עם מערכת החיפוש המתקדמת שלנו. אלפי שיעורים ממרצים מובילים במקום אחד.
              </p>
              <div style={styles.heroButtons}>
                {/* <button style={{ ...styles.btnBase, ...styles.btnPrimary, ...styles.btnLarge }}>
                  התחל עכשיו
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button> */}
                {/* <button style={{ ...styles.btnBase, ...styles.btnOutline, ...styles.btnLarge }}>צפה בדמו</button> */}
             
                <div style={styles.headerContent}>
          <div></div>
          <div style={styles.headerActions}>
            <button
              style={{ ...styles.btnBase, ...styles.btnGhost }}
              onClick={() => {
                setIsLoginOpen(true);
                setType("Login");
              }}
            >
              התחברות
            </button>
            <button
              style={{ ...styles.btnBase, ...styles.btnPrimary }}
              onClick={() => {
                setIsLoginOpen(true);
                setType("Sign");
              }}
            >
              הרשמה
            </button>
          </div>
        </div>
              </div>
            </div>

            <div style={styles.heroVisual}>
              <div style={styles.floatingCards}>
                <div style={{ ...styles.floatingCard, ...styles.card1 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                      stroke="#6b7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                      stroke="#6b7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div style={{ ...styles.floatingCard, ...styles.card2 }}></div>
                <div style={{ ...styles.floatingCard, ...styles.card3 }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>    

      <section style={styles.featuresSection}>
        <div style={styles.featuresContent}>
          <span style={styles.sectionBadge}>תכונות מתקדמות</span>
          <h2 style={styles.sectionTitle}>כל מה שאתה צריך לשיעורים שלך</h2>
          <p style={styles.sectionDescription}>הפלטפורמה שלנו מספקת חוויה חלקה לחיפוש, ארגון ומעקב אחר השיעורים שלך.</p>

          <div style={styles.featuresGrid} className="features-grid">
            <div
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)"
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div style={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="m21 21-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 style={styles.featureTitle}>חיפוש מתקדם</h3>
              <p style={styles.featureDescription}>
                מצא שיעורים לפי מרצה, נושא או מילות מפתח עם מנוע החיפוש החכם שלנו.
              </p>
            </div>

            <div
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)"
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div style={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 style={styles.featureTitle}>ניהול תלמידים</h3>
              <p style={styles.featureDescription}>עקוב אחר התקדמות התלמידים שלך ונהל את כל המידע במקום אחד.</p>
            </div>

            <div
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)"
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div style={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 style={styles.featureTitle}>בוט AI חכם</h3>
              <p style={styles.featureDescription}>
                קבל תשובות מיידיות לשאלות שלך עם העוזר החכם המבוסס על בינה מלאכותית.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>© 2025 מערכת שיעורים. כל הזכויות שמורות.</p>
      </footer>
    </div>
  )
}

