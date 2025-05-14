import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell as BellIcon, Palette, Sun, Moon, Check } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './AppearanceSettingsPage.module.css';
import NotificationModal from '../../components/NotificationModal/NotificationModal';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import { accentPalettes, defaultAccentPaletteIndex } from '../../config/themeConfig';

// Sample data for the preview graph
const previewGraphData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 500 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 650 },
];

const AppearanceSettingsPage = ({ isMenuOpen }) => {
  const navigate = useNavigate();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Appearance - Regulars Dashboard";
  }, []);

  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [currentFontSize, setCurrentFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium');
  const [accentPaletteIndex, setAccentPaletteIndex] = useState(() => {
    const storedIndex = localStorage.getItem('accentPaletteIndex');
    return storedIndex ? parseInt(storedIndex, 10) : defaultAccentPaletteIndex;
  });

  // State for preview graph colors
  const [previewAccentColor, setPreviewAccentColor] = useState(accentPalettes[accentPaletteIndex].primary);
  const [previewAxisColor, setPreviewAxisColor] = useState('var(--text-secondary)');
  const [previewCardBgColor, setPreviewCardBgColor] = useState('var(--background-primary)');
  const [previewTooltipBgColor, setPreviewTooltipBgColor] = useState('var(--background-primary)');
  const [previewTooltipTextColor, setPreviewTooltipTextColor] = useState('var(--text-primary)');

  const updatePreviewGraphColors = useCallback(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    setPreviewAccentColor(accentPalettes[accentPaletteIndex].primary);
    setPreviewAxisColor(rootStyle.getPropertyValue('--text-secondary').trim());
    setPreviewCardBgColor(rootStyle.getPropertyValue('--background-primary').trim());
    setPreviewTooltipBgColor(rootStyle.getPropertyValue('--background-primary').trim());
    setPreviewTooltipTextColor(rootStyle.getPropertyValue('--text-primary').trim());
  }, [accentPaletteIndex, currentTheme]); // Ensure currentTheme is a dependency

  // Effect for Theme (Light/Dark)
  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${currentTheme}-theme`);
    localStorage.setItem('theme', currentTheme);
    updatePreviewGraphColors(); // Update preview graph colors on theme change
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: currentTheme } }));
  }, [currentTheme, updatePreviewGraphColors]);

  // Effect for Font Size
  useEffect(() => {
    let newBaseSizeVariable;
    switch (currentFontSize) {
      case 'small': newBaseSizeVariable = 'var(--font-size-small)'; break;
      case 'large': newBaseSizeVariable = 'var(--font-size-large)'; break;
      default: newBaseSizeVariable = 'var(--font-size-medium)'; break;
    }
    document.documentElement.style.setProperty('--current-font-base', newBaseSizeVariable);
    localStorage.setItem('fontSize', currentFontSize);
  }, [currentFontSize]);

  // Effect for Accent Palette
  useEffect(() => {
    localStorage.setItem('accentPaletteIndex', accentPaletteIndex.toString());
    updatePreviewGraphColors(); // Update preview graph colors on accent change
    document.dispatchEvent(new CustomEvent('accentPaletteChanged', { detail: { accentPaletteIndex } }));
  }, [accentPaletteIndex, updatePreviewGraphColors]);
  
  // Initial color update on mount
  useEffect(() => {
    updatePreviewGraphColors();
  }, [updatePreviewGraphColors]);

  const toggleNotificationModal = () => setIsNotificationModalOpen(!isNotificationModalOpen);
  const handleNotificationButtonMouseDown = (e) => e.stopPropagation();

  const fontSizes = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
  ];

  return (
    <main className={`${styles.appearanceSettingsPage} ${!isMenuOpen ? styles.menuClosed : ''}`}>
      <div className={styles.stickyHeaderArea}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.breadcrumbTitle}>
              <span className={styles.breadcrumbMain} onClick={() => navigate('/settings')}>
                Settings
              </span>
              <span className={styles.breadcrumbSeparator}>&gt;</span>
              <span className={styles.breadcrumbCurrent}>Appearance</span>
            </div>
          </div>
          <div className={styles.notificationButtonWrapper}>
            <button
              className={styles.notificationBtn}
              onClick={toggleNotificationModal}
              onMouseDown={handleNotificationButtonMouseDown}
              aria-label="Notifications"
            >
              <BellIcon />
            </button>
            {isNotificationModalOpen && <NotificationModal onClose={() => setIsNotificationModalOpen(false)} />}
          </div>
        </header>
      </div>

      <div className={styles.contentArea}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <section className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Color Scheme</h2>
          <div className={styles.themeToggleContainer}>
            <button
              className={`${styles.themeButton} ${currentTheme === 'light' ? styles.activeTheme : ''}`}
              onClick={() => setCurrentTheme('light')}
            >
              <Sun size={20} /> Light
            </button>
            <button
              className={`${styles.themeButton} ${currentTheme === 'dark' ? styles.activeTheme : ''}`}
              onClick={() => setCurrentTheme('dark')}
            >
              <Moon size={20} /> Dark
            </button>
          </div>
        </section>

        <section className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Font Size</h2>
          <div className={styles.fontSizeSelector}>
            {fontSizes.map(size => (
              <button
                key={size.id}
                className={`${styles.fontSizeButton} ${currentFontSize === size.id ? styles.activeFont : ''}`}
                onClick={() => setCurrentFontSize(size.id)}
              >
                {size.label}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Graph Colors</h2>
          <div className={styles.graphColorsContainer}>
            <div className={styles.graphPreviewCard} style={{ backgroundColor: previewCardBgColor }}>
              <p className={styles.previewLabel}>Example:</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={previewGraphData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                  <XAxis dataKey="name" stroke={previewAxisColor} tick={{ fill: previewAxisColor, fontSize: '0.75em' }} />
                  <YAxis stroke={previewAxisColor} tick={{ fill: previewAxisColor, fontSize: '0.75em' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: previewTooltipBgColor,
                      borderColor: 'var(--border-color)', // Use CSS var for border
                      borderRadius: '8px',
                      color: previewTooltipTextColor,
                    }}
                    labelStyle={{ color: previewTooltipTextColor, fontWeight: 'bold' }}
                    itemStyle={{ color: previewTooltipTextColor }}
                    cursor={{ stroke: previewAccentColor, strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="value" stroke={previewAccentColor} fill={previewAccentColor} fillOpacity={0.2} strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.graphColorSelectors}>
              <div className={styles.selectorItem}>
                <h3 className={styles.selectorTitle}>Accent Palette</h3>
                <div className={styles.paletteGrid}>
                  {accentPalettes.map((palette, index) => (
                    <button
                      key={palette.name}
                      title={palette.name}
                      className={`${styles.paletteColorBox} ${accentPaletteIndex === index ? styles.activePalette : ''}`}
                      style={{ backgroundColor: palette.primary }}
                      onClick={() => setAccentPaletteIndex(index)}
                    >
                      {accentPaletteIndex === index && <Check size={16} color="#fff" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.selectorItem}>
                <h3 className={styles.selectorTitle}>Background</h3>
                <div className={styles.colorDisplayBox}>
                  <div className={styles.colorSwatch} style={{ backgroundColor: previewCardBgColor }}></div>
                  <span>{previewCardBgColor.toUpperCase()}</span>
                </div>
              </div>
              <div className={styles.selectorItem}>
                <h3 className={styles.selectorTitle}>Axis</h3>
                <div className={styles.colorDisplayBox}>
                  <div className={styles.colorSwatch} style={{ backgroundColor: previewAxisColor }}></div>
                  <span>{previewAxisColor.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
       
      </div>
    </main>
  );
};

export default AppearanceSettingsPage;
