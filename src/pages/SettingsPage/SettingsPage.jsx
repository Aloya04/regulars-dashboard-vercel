import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Bell as BellIcon, ChevronRight } from 'lucide-react';
import styles from './SettingsPage.module.css';
import NotificationModal from '../../components/NotificationModal/NotificationModal';

const SettingsPage = ({ isMenuOpen }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Settings - Regulars Dashboard";
  }, []);

  const toggleNotificationModal = () => setIsNotificationModalOpen(!isNotificationModalOpen);
  const handleNotificationButtonMouseDown = (e) => e.stopPropagation();

  const settingsItems = [
    {
      id: 'account',
      icon: <img src="/images/user.png" alt="Account" className={styles.settingsItemImageIcon} />,
      title: 'Account',
      subtitle: 'account details, subscription plan, password',
    },
    {
      id: 'appearance',
      icon: <img src="/images/appearance.png" alt="Appearance" className={styles.settingsItemImageIcon} />,
      title: 'Appearance',
      subtitle: 'contrast mode, graph colors, font size',
      onClick: () => navigate('/settings/appearance'), // Navigate to appearance settings
    },
    {
      id: 'notifications',
      icon: <img src="/images/bell.png" alt="Notifications" className={styles.settingsItemImageIcon} />,
      title: 'Notifications',
      subtitle: 'weekly summaries, billing reminders, campaign alerts',
    },
  ];

  return (
    <main className={`${styles.settingsPage} ${!isMenuOpen ? styles.menuClosed : ""}`}>
      <div className={styles.stickyHeaderArea}>
        <div className={styles.header}>
          <h1>Settings</h1>
          <div className={styles.notificationButtonWrapper}>
            <button
              className={styles.notificationBtn}
              onClick={toggleNotificationModal}
              onMouseDown={handleNotificationButtonMouseDown}
            >
              <BellIcon />
            </button>
            {isNotificationModalOpen && <NotificationModal onClose={() => setIsNotificationModalOpen(false)} />}
          </div>
        </div>
      </div>

      <div className={styles.settingsContentArea}>
        <div className={styles.settingsList}>
          {settingsItems.map(item => (
            <button key={item.id} className={styles.settingsItem} onClick={item.onClick}>
              <div className={styles.settingsItemIconContainer}>{item.icon}</div> {/* Wrapped icon for consistent sizing */}
              <div className={styles.settingsItemText}>
                <span className={styles.settingsItemTitle}>{item.title}</span>
                <span className={styles.settingsItemSubtitle}>{item.subtitle}</span>
              </div>
              <ChevronRight size={28} strokeWidth={2.5} className={styles.settingsItemArrow} /> {/* Adjusted size and strokeWidth */}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
