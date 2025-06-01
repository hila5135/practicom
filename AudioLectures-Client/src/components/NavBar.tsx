"use client"

import { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { Home, BookOpen, Users, Sparkles } from "lucide-react"
import { UserContext } from "./userContext";
const NavBar = () => {
  const context = useContext(UserContext)
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  console.log(setIsMobileMenuOpen)
  const navigationItems = [
    {
      id: "home",
      title: "דף הבית",
      description: "חזרה לעמוד הראשי של המערכת",
      icon: Home,
      path: "/",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#667eea",
      emoji: "🏠",
      isPublic: true,
    },
    {
      id: "actions",
      title: "פעולות משתמשים",
      description: "חיפוש שיעורים, ניהול תוכן ופעולות יומיומיות",
      icon: BookOpen,
      path: "/actionsForUsers",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      color: "#f093fb",
      emoji: "📚",
      isPublic: false,
    },
    {
      id: "lecturers",
      title: "מרצים",
      description: "ניהול מרצים, צפייה בפרופילים ומידע מפורט",
      icon: Users,
      path: "/lecturers",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      color: "#4facfe",
      emoji: "👨‍🏫",
      isPublic: false,
    },
  ]

  const visibleItems = navigationItems.filter((item) => item.isPublic || (context?.user && context.user.id))

  

  const styles = {
    nav: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "80px",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      textDecoration: "none",
    },
    logoIcon: {
      width: "48px",
      height: "48px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
      transition: "all 0.3s ease",
    },
    logoText: {
      fontSize: "24px",
      fontWeight: "800",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    navItems: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "rgba(255, 255, 255, 0.6)",
      padding: "8px",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(10px)",
    },
    navItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "12px 20px",
      borderRadius: "16px",
      textDecoration: "none",
      color: "#64748b",
      fontSize: "15px",
      fontWeight: "600",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative" as const,
      overflow: "hidden",
      background: "transparent",
    },
    navItemActive: {
      background: "rgba(255, 255, 255, 0.9)",
      color: "#1e293b",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      transform: "translateY(-2px)",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "10px 16px",
      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
      borderRadius: "16px",
      border: "1px solid rgba(16, 185, 129, 0.2)",
      backdropFilter: "blur(10px)",
    },
    userAvatar: {
      width: "40px",
      height: "40px",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "16px",
      fontWeight: "700",
      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
    },
    userText: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "2px",
    },
    userName: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#047857",
      margin: 0,
    },
    userStatus: {
      fontSize: "12px",
      color: "#059669",
      margin: 0,
    },
    logoutButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 16px",
      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      borderRadius: "12px",
      color: "#dc2626",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
    },
    mobileMenuButton: {
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      width: "44px",
      height: "44px",
      background: "rgba(255, 255, 255, 0.8)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
    },
    mobileMenu: {
      position: "fixed" as const,
      top: "80px",
      left: 0,
      right: 0,
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
      opacity: isMobileMenuOpen ? 1 : 0,
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      pointerEvents: isMobileMenuOpen ? "auto" : "none",
    },
    mobileNavItem: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "16px 20px",
      marginBottom: "8px",
      borderRadius: "16px",
      textDecoration: "none",
      color: "#64748b",
      fontSize: "16px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      background: "rgba(255, 255, 255, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    shimmer: {
      position: "absolute" as const,
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
      transition: "left 0.6s ease",
    },
  }

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          .nav-item-shimmer:hover .shimmer {
            animation: shimmer 0.8s ease;
          }
          
          .logo-hover:hover {
            transform: scale(1.05) rotate(5deg);
          }
          
          @media (max-width: 1024px) {
            .desktop-nav {
              display: none !important;
            }
            
            .mobile-menu-btn {
              display: flex !important;
            }
          }
          
          @media (min-width: 1025px) {
            .mobile-menu {
              display: none !important;
            }
          }
        `}
      </style>

      <nav style={styles.nav}>
        <div style={styles.container}>
          {/* Logo */}
          <Link to="/" style={styles.logo}>
            <div style={styles.logoIcon} className="logo-hover">
              <Sparkles size={24} color="white" />
            </div>
           
          </Link>

          
          <div style={styles.navItems} className="desktop-nav">
            {visibleItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="nav-item-shimmer"
                  style={{
                    ...styles.navItem,
                    ...(isActive ? styles.navItemActive : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${item.color}15, ${item.color}08)`
                      e.currentTarget.style.color = item.color
                      e.currentTarget.style.transform = "translateY(-2px)"
                      e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}20`
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent"
                      e.currentTarget.style.color = "#64748b"
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "none"
                    }
                  }}
                >
                  <div style={styles.shimmer} className="shimmer"></div>
                  <Icon size={20} />
                  <span>{item.title}</span>
                  <span style={{ fontSize: "18px" }}>{item.emoji}</span>
                </Link>
              )
            })}
          </div>
          <span style={styles.logoText}>מערכת שיעורים</span>

   </div>  </nav>  </>
  )}

export default NavBar;
