export const mockData7Days = {
  stats: {
    newMembers: { value: 89, trend: '+1%' },
    visits: { value: '5k', trend: '+2%' },
    redemptions: { value: 805, trend: '+3%' },
  },
  sales: {
    amount: '45,000 DKK',
    trend: '+1%',
  },
  graphData: [
    { name: "Mon", value: 15000 },
    { name: "Tue", value: 18000 },
    { name: "Wed", value: 12000 },
    { name: "Thu", value: 22000 },
    { name: "Fri", value: 25000 },
    { name: "Sat", value: 30000 },
    { name: "Sun", value: 28000 },
  ],
  popularItems: [
    { name: "Bun with cheese", sold: 153 },
    { name: "Cappuccino", sold: 120 },
    { name: "Cinnamon bun", sold: 92 },
  ],
  inboxMessages: 2,
  averageRating: 4.3,
};

export const mockData30Days = {
  stats: {
    newMembers: { value: 350, trend: '+5%' },
    visits: { value: '22k', trend: '+8%' },
    redemptions: { value: 2500, trend: '+10%' },
  },
  sales: {
    amount: '180,000 DKK',
    trend: '+3%',
  },
  graphData: [
    { name: "Week 1", value: 60000 },
    { name: "Week 2", value: 55000 },
    { name: "Week 3", value: 62000 },
    { name: "Week 4", value: 58000 },
  ],
  popularItems: [
    { name: "Latte", sold: 1053 },
    { name: "Croissant", sold: 960 },
    { name: "Americano", sold: 742 },
  ],
  inboxMessages: 10,
  averageRating: 4.5,
};

export const mockDataToday = {
  stats: {
    newMembers: { value: 5, trend: '+0.5%' },
    visits: { value: '250', trend: '+1%' },
    redemptions: { value: 30, trend: '+0.2%' },
  },
  sales: {
    amount: '3,500 DKK',
    trend: '+0.5%',
  },
  graphData: [ // Hourly data for today
    { name: "8am", value: 300 }, { name: "9am", value: 500 }, { name: "10am", value: 700 },
    { name: "11am", value: 600 }, { name: "12pm", value: 900 }, { name: "1pm", value: 800 },
    { name: "2pm", value: 750 }, { name: "3pm", value: 650 },
  ],
  popularItems: [
    { name: "Coffee", sold: 15 },
    { name: "Sandwich", sold: 10 },
  ],
  inboxMessages: 1,
  averageRating: 4.2,
};

export const mockDataThisMonth = {
  stats: {
    newMembers: { value: 400, trend: '+4%' },
    visits: { value: '25k', trend: '+7%' },
    redemptions: { value: 3000, trend: '+9%' },
  },
  sales: {
    amount: '210,000 DKK',
    trend: '+4.5%',
  },
  graphData: [ // Daily data for the month (simplified)
    { name: "Day 1", value: 7000 }, { name: "Day 5", value: 7500 }, { name: "Day 10", value: 8000 },
    { name: "Day 15", value: 6500 }, { name: "Day 20", value: 7200 }, { name: "Day 25", value: 8100 },
  ],
  popularItems: [
    { name: "Salad Bowl", sold: 800 },
    { name: "Iced Tea", sold: 750 },
    { name: "Muffin", sold: 600 },
  ],
  inboxMessages: 8,
  averageRating: 4.4,
};

export const mockDataAllTime = {
  stats: {
    newMembers: { value: 5000, trend: '+20%' },
    visits: { value: '300k', trend: '+15%' },
    redemptions: { value: 25000, trend: '+18%' },
  },
  sales: {
    amount: '2,500,000 DKK',
    trend: '+12%',
  },
  graphData: [ // Monthly data for all time (simplified)
    { name: "Jan", value: 200000 }, { name: "Feb", value: 220000 }, { name: "Mar", value: 210000 },
    { name: "Apr", value: 230000 }, { name: "May", value: 250000 }, { name: "Jun", value: 240000 },
  ],
  popularItems: [
    { name: "Signature Burger", sold: 10000 },
    { name: "Classic Pizza", sold: 9500 },
    { name: "Loyalty Shake", sold: 8000 },
  ],
  inboxMessages: 50,
  averageRating: 4.6,
};

export const mockDataCustomPeriod = {
  stats: {
    newMembers: { value: 120, trend: '+2.5%' },
    visits: { value: '7.5k', trend: '+3%' },
    redemptions: { value: 1100, trend: '+4%' },
  },
  sales: {
    amount: '95,000 DKK',
    trend: '+2.8%',
  },
  graphData: [ // Example: Data for a custom 10-day period
    { name: "Day 1", value: 8000 }, { name: "Day 2", value: 9500 }, { name: "Day 3", value: 7000 },
    { name: "Day 4", value: 10000 }, { name: "Day 5", value: 11000 }, { name: "Day 6", value: 9000 },
    { name: "Day 7", value: 12000 }, { name: "Day 8", value: 10500 }, { name: "Day 9", value: 11500 },
    { name: "Day 10", value: 13000 },
  ],
  popularItems: [
    { name: "Custom Shake", sold: 450 },
    { name: "Special Wrap", sold: 380 },
  ],
  inboxMessages: 3,
  averageRating: 4.4,
};
