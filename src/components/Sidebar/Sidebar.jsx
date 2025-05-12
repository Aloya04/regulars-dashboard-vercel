import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Users,
  Bell,
  Mail,
  Star,
  Settings,
  HelpCircle,
  User,
  ArrowLeftFromLine,
  Scan,
} from "lucide-react";
import RegularsLogo from "../../assets/regulars-logo.svg";
import styles from "./Sidebar.module.css";

function Sidebar({ isMenuOpen, setIsMenuOpen }) {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard />, text: "Overview", path: "/" },
    { icon: <CreditCard />, text: "Loyalty Cards", path: "/loyalty-cards" },
    { icon: <BarChart3 />, text: "Analytics", path: "/analytics" },
    { icon: <Users />, text: "Members", path: "/members" },
    { icon: <Bell />, text: "Push Notifications", path: "/push-notifications" },
    { icon: <Mail />, text: "Mails", path: "/mails" },
    { icon: <Star />, text: "Feedback", path: "/feedback" },
  ];

  const bottomMenuItems = [
    { icon: <Scan />, text: "Scanner", path: "/scanner" },
    { icon: <Settings />, text: "Settings", path: "/settings" },
    { icon: <HelpCircle />, text: "Help Center", path: "/help-center" },
    { icon: <User />, text: "My Profile", path: "/profile" },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`${styles.sidebar} ${!isMenuOpen ? styles.menuClosed : ""}`}>
      <div className={styles.logo}>
        <div className={styles.logoWrapper}>
          <img src={RegularsLogo} alt="Regulars" className={styles.logoImg} />
          <ArrowLeftFromLine
            className={styles.collapseArrow}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>

      <div className={styles.menuItems}>
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.text}
            className={`${styles.navItem} ${
              location.pathname === item.path ? styles.active : ""
            }`}
            onClick={handleLinkClick}
          >
            {item.icon}
            <span>{item.text}</span>
          </Link>
        ))}
      </div>

      <div className={styles.bottomMenu}>
        {bottomMenuItems.map((item) => (
          <Link
            to={item.path}
            key={item.text}
            className={`${styles.navItem} ${
              location.pathname === item.path ? styles.active : ""
            }`}
            onClick={handleLinkClick}
          >
            {item.icon}
            <span>{item.text}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Sidebar;
