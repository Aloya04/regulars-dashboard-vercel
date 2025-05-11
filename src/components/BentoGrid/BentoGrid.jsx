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

const data = [
  { name: "1", value: 15000 },
  { name: "5", value: 25000 },
  { name: "10", value: 20000 },
  { name: "15", value: 45000 },
  { name: "20", value: 35000 },
  { name: "25", value: 40000 },
  { name: "30", value: 45000 },
];

const popularItems = [
  { name: "Bun with cheese", sold: 1053 },
  { name: "Cappuccino", sold: 960 },
  { name: "Cinnamon bun", sold: 542 },
];

function BentoGrid() {
  return (
    <div className={styles.bentoContainer}>
      <div className={styles.leftSection}>
        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <div className={styles.stat}>
              <div className={styles.statHeader}>
                <h3>89</h3>
                <span className={styles.badge}>+1%</span>
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
                <h3>5k</h3>
                <span className={styles.badge}>+2%</span>
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
                <h3>805</h3>
                <span className={styles.badge}>+3%</span>
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
              <h2>45,000 DKK</h2>
              <span className={styles.badge}>+1%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
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
            <p>You've got 2 mails!</p>
          </div>
        </div>

        <div className={styles.popularCard}>
          <h3>Popular</h3>
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
          <div className={styles.rating}>4.3</div>
        </div>
      </div>
    </div>
  );
}

export default BentoGrid;
