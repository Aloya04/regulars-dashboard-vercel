import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Users,
  Bell,
  Mail, Settings, Scan,
  Star,
  HelpCircle,
  User,
  ArrowLeftFromLine,
} from "lucide-react";
import RegularsLogo from "../../assets/regulars-logo.svg"; 
import styles from "./Sidebar.module.css"; 

// 'isMenuOpen' tells if the sidebar is wide or narrow.
// 'setIsMenuOpen' is a function to change that state.
function Sidebar({ isMenuOpen, setIsMenuOpen }) {
  // 'location' gives us info about the current url, like the pathname.
  const location = useLocation();

  // list of our main navigation items.
  const menuItems = [
    { icon: <LayoutDashboard />, text: "Overview", path: "/" },
    { icon: <CreditCard />, text: "Loyalty Cards", path: "/loyalty-cards" },
    { icon: <BarChart3 />, text: "Analytics", path: "/analytics" },
    { icon: <Users />, text: "Members", path: "/members" },
    { icon: <Bell />, text: "Push Notifications", path: "/push-notifications" },
    { icon: <Mail />, text: "Mails", path: "/mails" },
    { icon: <Star />, text: "Feedback", path: "/feedback" },
  ];

  // list of items for the bottom part of the menu.
  const bottomMenuItems = [
    { icon: <Scan />, text: "Scanner", path: "/scanner" },
    { icon: <Settings />, text: "Settings", path: "/settings" },
    { icon: <HelpCircle />, text: "Help Center", path: "/help-center" },
    { icon: <User />, text: "My Profile", path: "/profile" },
  ];

  // if we're on a small screen (mobile) and click a link, close the menu.
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    // the main navigation container. its class changes if the menu is open or closed.
    <nav className={`${styles.sidebar} ${!isMenuOpen ? styles.menuClosed : ""}`}>
      <div className={styles.logo}>
        <div className={styles.logoWrapper}>
          <img src={RegularsLogo} alt="Regulars" className={styles.logoImg} />
          {/* this arrow button collapses or expands the sidebar. */}
          <ArrowLeftFromLine
            className={styles.collapseArrow}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>

      {/* container for the main menu items. */}
      <div className={styles.menuItems}>
        {/* loop through 'menuItems' and create a link for each. */}
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.text} // unique key for react.
            // class changes if this link is the active (current) page.
            className={`${styles.navItem} ${
              location.pathname === item.path ? styles.active : ""
            }`}
            onClick={handleLinkClick} // handle click for mobile behavior.
          >
            {item.icon} {/* the icon for the menu item. */}
            <span>{item.text}</span> {/* the text for the menu item. */}
          </Link>
        ))}
      </div>

      {/* container for the bottom menu items. */}
      <div className={styles.bottomMenu}>
        {/* loop through 'bottomMenuItems' and create a link for each. */}
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
