import { Users, Eye, Gift, Mail } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./BentoGrid.module.css";

// this is the main function for the bento grid component.
// it takes 'bentoData' as an input, which holds all the info we want to show.
function BentoGrid({ bentoData }) {
  // setting up some colors for the chart.
  const chartLineColor = "var(--loyal-blue-static)";
  const chartAxisColor = "var(--text-secondary)";

  // we're pulling out specific pieces of data from bentoData to use them more easily.
  const { stats, sales, graphData, popularItems, inboxMessages, averageRating } = bentoData;

  // this is what the component will look like on the screen.
  return (
    // the main container for the bento grid layout.
    <div className={styles.bentoContainer}>
      {/* this is the left column of the grid. */}
      <div className={styles.leftSection}>
        {/* a section to show key statistics like new members, visits, etc. */}
        <section className={styles.statsGrid} aria-labelledby="stats-grid-heading">
          {/* this heading is hidden visually but helps screen readers understand the section. */}
          <h2 id="stats-grid-heading" className="visually-hidden">Key Statistics</h2>
          
          {/* card for new members. */}
          <div className={styles.card} role="region" aria-labelledby="new-members-heading">
            <div className={styles.stat}>
              <div className={styles.statHeader}>
                <h3 id="new-members-heading">{stats.newMembers.value}</h3>
                <span className={styles.badge}>{stats.newMembers.trend}</span>
              </div>
              <div className={styles.statRow}>
                {/* users icon, hidden from screen readers as it's decorative. */}
                <Users className={styles.icon} aria-hidden="true" />
                <p>New members</p>
              </div>
            </div>
          </div>
          {/* card for visits. */}
          <div className={styles.card} role="region" aria-labelledby="visits-heading">
            <div className={styles.stat}>
              <div className={styles.statHeader}>
                <h3 id="visits-heading">{stats.visits.value}</h3>
                <span className={styles.badge}>{stats.visits.trend}</span>
              </div>
              <div className={styles.statRow}>
                {/* eye icon, hidden from screen readers. */}
                <Eye className={styles.icon} aria-hidden="true" />
                <p>Visits</p>
              </div>
            </div>
          </div>
          {/* card for redemptions. */}
          <div className={styles.card} role="region" aria-labelledby="redemptions-heading">
            <div className={styles.stat}>
              <div className={styles.statHeader}>
                <h3 id="redemptions-heading">{stats.redemptions.value}</h3>
                <span className={styles.badge}>{stats.redemptions.trend}</span>
              </div>
              <div className={styles.statRow}>
                {/* gift icon, hidden from screen readers. */}
                <Gift className={styles.icon} aria-hidden="true" />
                <p>Redemptions</p>
              </div>
            </div>
          </div>
        </section>

        {/* section for the sales card, which includes a chart. */}
        <section className={styles.salesCard} role="region" aria-labelledby="sales-heading-main">
          <div className={styles.salesHeader}>
            <h3 id="sales-heading-main">Sales</h3>
            <div className={styles.salesAmount}>
              <h2>{sales.amount}</h2>
              <span className={styles.badge}>{sales.trend}</span>
            </div>
          </div>
          {/* this container makes our chart responsive, so it fits different screen sizes. */}
          <ResponsiveContainer width="100%" height={300}>
            {/* the area chart itself, showing sales trends. */}
            <AreaChart data={graphData} aria-label={`Sales trend chart showing data for ${graphData.length} periods.`}>
              {/* the x-axis of our chart (usually time periods). */}
              <XAxis
                dataKey="name"
                stroke={chartAxisColor}
                tick={{ fontSize: '0.75rem', fill: chartAxisColor }}
                aria-hidden="true" 
              />
              {/* the y-axis of our chart (usually sales values). */}
              <YAxis
                stroke={chartAxisColor}
                tick={{ fontSize: '0.75rem', fill: chartAxisColor }}
                aria-hidden="true" 
              />
              {/* the tooltip that appears when you hover over the chart. */}
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background-primary)',
                  borderColor: 'var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                }}
                labelStyle={{
                  color: 'var(--text-primary)',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
                itemStyle={{ color: 'var(--text-primary)' }}
                cursor={{
                  stroke: chartLineColor,
                  strokeWidth: 1,
                  strokeDasharray: '3 3',
                }}
              />
              {/* the actual area on the chart representing sales data. */}
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartLineColor}
                fill={chartLineColor}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>
      </div>

      {/* this is the right column of our bento grid. */}
      <div className={styles.rightSection}>
        {/* a card for inbox messages. */}
        <section className={styles.infoCard} role="region" aria-labelledby="inbox-heading">
          <h3 id="inbox-heading">Inbox</h3>
          <div className={styles.infoContent}>
            {/* mail icon, hidden from screen readers. */}
            <Mail className={styles.icon} aria-hidden="true" />
            <p>You've got {inboxMessages} mails!</p>
          </div>
        </section>

        {/* a card showing popular items. */}
        <section className={styles.popularCard} role="region" aria-labelledby="popular-items-heading">
          <div className={styles.popularHeader}>
            <h3 id="popular-items-heading">Popular</h3>
            <span className={styles.allTimeLabel}>(All Time)</span>
          </div>
          {/* a list of popular items. */}
          <div className={styles.popularList}>
            {/* we loop through each popular item and display its name and how many were sold. */}
            {popularItems.map((item, index) => (
              <div key={index} className={styles.popularItem}>
                <span>{item.name}</span>
                <span>{item.sold} sold</span>
              </div>
            ))}
          </div>
        </section>

        {/* a card for the average rating. */}
        <section className={styles.ratingCard} role="region" aria-labelledby="average-rating-heading">
          <h3 id="average-rating-heading">Average Rating</h3>
          <div className={styles.rating}>{averageRating}</div>
        </section>
      </div>
    </div>
  );
}


export default BentoGrid;
