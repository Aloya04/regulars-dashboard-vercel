import React from "react";
import { Users, Eye, Gift, DollarSign, Mail } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./BentoGrid.module.css";

function BentoGrid({ bentoData }) {
  if (!bentoData) {
    return <div>Loading data...</div>;
  }

  const { stats, sales, graphData, popularItems, inboxMessages, averageRating } = bentoData;

  return (
    <div className={styles.bentoContainer}>
      <div className={styles.leftSection}>
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
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--loyal-blue)"
                fill="var(--loyal-blue)"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.rightSection}>
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
