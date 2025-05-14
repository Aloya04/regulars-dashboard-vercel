import React, { useState, useEffect, useCallback } from "react";
import { Users, Eye, Gift, Mail } from "lucide-react"; // Removed DollarSign as it's not used
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./BentoGrid.module.css";
import { accentPalettes, defaultChartColor, defaultAccentPaletteIndex } from '../../config/themeConfig'; // Import from shared config

function BentoGrid({ bentoData }) {
  const [currentChartColor, setCurrentChartColor] = useState(defaultChartColor);
  const [currentAxisColor, setCurrentAxisColor] = useState('var(--text-secondary)');

  // Function to update colors based on localStorage and current theme
  const updateColors = useCallback(() => {
    // Update Accent Color for the graph line
    const storedPaletteIndex = localStorage.getItem('accentPaletteIndex');
    const paletteIndex = storedPaletteIndex ? parseInt(storedPaletteIndex, 10) : defaultAccentPaletteIndex;
    setCurrentChartColor(accentPalettes[paletteIndex]?.primary || defaultChartColor);

    // Update Axis Color based on current theme CSS variable
    const rootStyle = getComputedStyle(document.documentElement);
    setCurrentAxisColor(rootStyle.getPropertyValue('--text-secondary').trim() || '#575757'); // Fallback for light
  }, []);

  useEffect(() => {
    updateColors(); // Initial call to set colors

    // Listener for localStorage changes (e.g., from another tab)
    const handleStorageChange = (event) => {
      if (event.key === 'accentPaletteIndex' || event.key === 'theme') {
        updateColors();
      }
    };
    const handleThemeChangedEvent = () => updateColors();
    const handleAccentPaletteChangedEvent = () => updateColors();

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('themeChanged', handleThemeChangedEvent);
    document.addEventListener('accentPaletteChanged', handleAccentPaletteChangedEvent);

    // MutationObserver to catch direct body class changes (e.g., theme class)
    const observer = new MutationObserver(updateColors);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('themeChanged', handleThemeChangedEvent);
      document.removeEventListener('accentPaletteChanged', handleAccentPaletteChangedEvent);
      observer.disconnect();
    };
  }, [updateColors]);

  // Re-fetch colors if bentoData itself changes, as it might be a full refresh
  useEffect(() => {
    updateColors();
  }, [bentoData, updateColors]);

  if (!bentoData) {
    return <div>Loading data...</div>;
  }

  const { stats, sales, graphData, popularItems, inboxMessages, averageRating } = bentoData;

  return (
    <div className={styles.bentoContainer}>
      <div className={styles.leftSection}>
        {/* ... statsGrid ... */}
        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <div className={styles.stat}>
              <div className={styles.statHeader}>
                <h3>{stats.newMembers.value}</h3>
                <span className={styles.badge}>{stats.newMembers.trend}</span>
              </div>
              <div className={styles.statRow}>
                <Users className={styles.icon} />
                <p>New members</p>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.stat}>
              <div className={styles.statHeader}>
                <h3>{stats.visits.value}</h3>
                <span className={styles.badge}>{stats.visits.trend}</span>
              </div>
              <div className={styles.statRow}>
                <Eye className={styles.icon} />
                <p>Visits</p>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.stat}>
              <div className={styles.statHeader}>
                <h3>{stats.redemptions.value}</h3>
                <span className={styles.badge}>{stats.redemptions.trend}</span>
              </div>
              <div className={styles.statRow}>
                <Gift className={styles.icon} />
                <p>Redemptions</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.salesCard}>
          <div className={styles.salesHeader}>
            <h3>Sales</h3>
            <div className={styles.salesAmount}>
              <h2>{sales.amount}</h2>
              <span className={styles.badge}>{sales.trend}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={graphData}>
              <XAxis
                dataKey="name"
                stroke={currentAxisColor} // Use state for axis color
                tick={{ fontSize: '0.75rem', fill: currentAxisColor }} // Ensure tick fill also uses the color
              />
              <YAxis
                stroke={currentAxisColor} // Use state for axis color
                tick={{ fontSize: '0.75rem', fill: currentAxisColor }} // Ensure tick fill also uses the color
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background-primary)',
                  borderColor: 'var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)', // Softer shadow
                }}
                labelStyle={{
                  color: 'var(--text-primary)', // Main text color for label
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
                itemStyle={{ color: 'var(--text-primary)' }} // Main text color for items
                cursor={{
                  stroke: currentChartColor, // Cursor uses the graph line color
                  strokeWidth: 1,
                  strokeDasharray: '3 3',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={currentChartColor} // Use state for line color
                fill={currentChartColor}   // Use state for fill color
                fillOpacity={0.1} // Keep fill light
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.rightSection}>
        {/* ... other cards ... */}
        <div className={styles.infoCard}>
          <h3>Inbox</h3>
          <div className={styles.infoContent}>
            <Mail className={styles.icon} />
            <p>You've got {inboxMessages} mails!</p>
          </div>
        </div>

        <div className={styles.popularCard}>
          <div className={styles.popularHeader}>
            <h3>Popular</h3>
            <span className={styles.allTimeLabel}>(All Time)</span>
          </div>
          <div className={styles.popularList}>
            {popularItems.map((item, index) => (
              <div key={index} className={styles.popularItem}>
                <span>{item.name}</span>
                <span>{item.sold} sold</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ratingCard}>
          <h3>Average Rating</h3>
          <div className={styles.rating}>{averageRating}</div>
        </div>
      </div>
    </div>
  );
}

export default BentoGrid;
