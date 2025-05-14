import React, { useState, useEffect } from 'react';
import { Bell as BellIcon, Search, Plus, Edit2, Copy, Trash2, Power } from 'lucide-react';
import styles from './LoyaltyCardsPage.module.css';
import NotificationModal from '../../components/NotificationModal/NotificationModal';

// Mock data for cards
const initialCardsData = [
  {
    id: 'stamp-card-1',
    title: 'Stamp Card',
    iconType: 'stamp',
    status: 'Active',
    type: 'Stamp',
  },
  {
    id: 'membership-card-1',
    title: 'Membership',
    iconType: 'membership',
    status: 'Inactive',
    type: 'Membership',
  },
  {
    id: 'stamp-card-2',
    title: 'Coffee Rewards',
    iconType: 'stamp',
    status: 'Active',
    type: 'Stamp',
  },
  {
    id: 'membership-card-2',
    title: 'VIP Club',
    iconType: 'membership',
    status: 'Active',
    type: 'Membership',
  },
];

// Reusable Card Component
const LoyaltyCard = ({ card, onDeleteCard }) => {
  const getIcon = () => {
    if (card.iconType === 'stamp') return <img src="/stamp-icon.svg" alt="Stamp" className={styles.cardIconCustom} />;
    if (card.iconType === 'membership') return <img src="/membership-icon.svg" alt="Membership" className={styles.cardIconCustom} />;
    return null;
  };

  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.cardTitle}>{card.title}</h3>
      <div className={styles.phoneMockup}>
        <div className={styles.phoneScreen}>
          {getIcon()}
        </div>
      </div>
      <button
        className={styles.ctaButton}
        onClick={() => console.log('View card:', card.id)}
      >
        View card
      </button>
      <div className={styles.tagsContainer}>
        <span className={`${styles.tag} ${card.status === 'Active' ? styles.activeTag : styles.inactiveTag}`}>
          <span className={styles.statusDot}></span>{card.status}
        </span>
        <span className={`${styles.tag} ${styles.typeTag}`}>{card.type}</span>
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.actionButton} title={card.status === 'Active' ? "Disable" : "Enable"}><Power size={18} /></button>
        <button className={styles.actionButton} title="Edit"><Edit2 size={18} /></button>
        <button className={styles.actionButton} title="Copy"><Copy size={18} /></button>
        <button className={styles.actionButton} title="Delete" onClick={() => onDeleteCard(card.id)}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

function LoyaltyCardsPage({ isMenuOpen }) {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [cards, setCards] = useState(initialCardsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    document.title = "Loyalty Cards - Regulars Dashboard";
  }, []);

  const toggleNotificationModal = () => setIsNotificationModalOpen(!isNotificationModalOpen);
  const handleNotificationButtonMouseDown = (e) => e.stopPropagation();

  const handleCreateCard = () => {
    console.log('Create new card button clicked');
    const newCardId = `new-card-${Date.now()}`;
    const newCard = {
        id: newCardId,
        title: 'New Loyalty Card',
        iconType: Math.random() > 0.5 ? 'stamp' : 'membership',
        status: 'Inactive',
        type: Math.random() > 0.5 ? 'Stamp' : 'Membership',
    };
    setCards(prevCards => [newCard, ...prevCards]);
  };

  const handleDeleteCard = (cardId) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || card.status === statusFilter;
    const matchesType = typeFilter === 'All' || card.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <main className={`${styles.loyaltyCardsPage} ${!isMenuOpen ? styles.menuClosed : ""}`}>
      <div className={styles.stickyHeaderArea}>
        <div className={styles.header}>
          <h1>Loyalty Cards</h1>
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
        <div className={styles.controlsHeader}>
          <button className={styles.createCardButton} onClick={handleCreateCard}>
            <Plus size={18} /> Create Card
          </button>
          <div className={styles.filterControls}>
            <span>Filter by:</span>
            <select className={styles.filterDropdown} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select className={styles.filterDropdown} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">Type</option>
              <option value="Stamp">Stamp</option>
              <option value="Membership">Membership</option>
            </select>
            <div className={styles.searchContainer}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardsGrid}>
        {filteredCards.map(card => (
          <LoyaltyCard key={card.id} card={card} onDeleteCard={handleDeleteCard} />
        ))}
        {filteredCards.length === 0 && (
          <p className={styles.noCardsMessage}>No loyalty cards match your filters. Try creating one!</p>
        )}
      </div>
    </main>
  );
}

export default LoyaltyCardsPage;
