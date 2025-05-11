import React from "react";
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

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const menuItems = [
    { icon: <LayoutDashboard />, text: "Overview", active: true },
    { icon: <CreditCard />, text: "Loyalty Cards" },
    { icon: <BarChart3 />, text: "Analytics" },
    { icon: <Users />, text: "Members" },
    { icon: <Bell />, text: "Push Notifications" },
    { icon: <Mail />, text: "Mails" },
    { icon: <Star />, text: "Feedback" },
  ];

  const bottomMenuItems = [
    { icon: <Scan />, text: "Scanner" },
    { icon: <Settings />, text: "Settings" },
    { icon: <HelpCircle />, text: "Help Center" },
    { icon: <User />, text: "My Profile" },
  ];

  return (
    <nav className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.logo}>
        <div className={styles.logoWrapper}>
          <img src={RegularsLogo} alt="Regulars" className={styles.logoImg} />
          <ArrowLeftFromLine className={styles.collapseArrow} />
        </div>
      </div>

      <Menu onClick={() => setIsCollapsed(!isCollapsed)} />

      <div className={styles.menuItems}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.navItem} ${item.active ? styles.active : ""}`}
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <div className={styles.bottomMenu}>
        {bottomMenuItems.map((item, index) => (
          <div key={index} className={styles.navItem}>
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Sidebar;
