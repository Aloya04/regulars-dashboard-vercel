import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  Bell as BellIcon, Search, Plus, Power, Edit2, Copy as CopyIcon, Trash2,
  CreditCard 
} from 'lucide-react';
import styles from './LoyaltyCardsPage.module.css';
import NotificationModal from '../../components/NotificationModal/NotificationModal';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { getLoyaltyCards, updateLoyaltyCardStatus, deleteLoyaltyCard } from '../../services/loyaltyCardService';

// a simple map to get lucide icon components by name.
// mainly for action buttons or if an image name isn't found.
const iconMap = {
  Plus: (props) => <Plus {...props} />,
  Power: (props) => <Power {...props} />,
  Edit2: (props) => <Edit2 {...props} />,
  Copy: (props) => <CopyIcon {...props} />,
  Trash2: (props) => <Trash2 {...props} />,
  CreditCard: (props) => <CreditCard {...props} />, 
};

// this is our main component for the loyalty cards page.
// 'isMenuOpen' tells if the sidebar is open.
// 'addToast' is a function to show pop-up messages.
const LoyaltyCardsPage = ({ isMenuOpen, addToast }) => {
  const navigate = useNavigate(); // for changing pages.
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [allCards, setAllCards] = useState([]); // holds all cards fetched from the database.
  const [displayedCards, setDisplayedCards] = useState([]); // cards currently shown after filtering.

  // state for filter inputs.
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // state for the delete confirmation pop-up.
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDeleteId, setCardToDeleteId] = useState(null);
  const [cardToDeleteTitle, setCardToDeleteTitle] = useState('');

  // state for the status toggle confirmation pop-up.
  const [showStatusToggleModal, setShowStatusToggleModal] = useState(false);
  const [cardToToggleStatus, setCardToToggleStatus] = useState(null); // stores { id, currentStatus, title }.


  const [isLoading, setIsLoading] = useState(true); // true when loading cards.

  // function to get all cards from the database.
  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const fetchedCards = await getLoyaltyCards();
      setAllCards(fetchedCards);
    } catch (error) {
      // if fetching fails, we could show an error to the user.
      // for now, it's simplified and doesn't log to console.
      addToast({ type: 'error', message: 'Could not load loyalty cards.' });
    } finally {
      setIsLoading(false);
    }
  };

  // this 'useEffect' runs once when the page loads.
  useEffect(() => {
    document.title = "Loyalty Cards - Regulars Dashboard"; // set the browser tab title.
    fetchCards(); // get the cards.
  }, []); // empty array means it only runs on mount.

  // this 'useEffect' runs whenever filters or the main card list changes.
  // it updates which cards are displayed.
  useEffect(() => {
    let filtered = [...allCards]; // start with all cards.

    // apply search filter.
    if (searchTerm) {
      filtered = filtered.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // apply status filter.
    if (statusFilter) {
      filtered = filtered.filter(card => card.status === statusFilter);
    }
    // apply type filter.
    if (typeFilter) {
      filtered = filtered.filter(card => card.cardType === typeFilter);
    }

    // add a special "create card" placeholder at the beginning of the list.
    const createCardPlaceholder = {
      id: 'create',
      title: 'Create Card',
      phoneImage: '/images/phone.png',
      overlayIconName: 'Plus', // uses the plus icon.
      buttonText: 'Create',
      buttonType: 'primary',
      buttonIconName: 'Plus',
      isPlaceholder: true, // marks this as the placeholder.
    };
    setDisplayedCards([createCardPlaceholder, ...filtered]);
  }, [searchTerm, statusFilter, typeFilter, allCards]); // re-run if these change.

  const toggleNotificationModal = () => setIsNotificationModalOpen(!isNotificationModalOpen);
  const handleNotificationButtonMouseDown = (e) => e.stopPropagation(); // prevents modal from closing immediately.

  // update state when filter inputs change.
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleStatusFilterChange = (event) => setStatusFilter(event.target.value);
  const handleTypeFilterChange = (event) => setTypeFilter(event.target.value);

  // --- status toggle logic ---
  // opens the confirmation pop-up for changing a card's status.
  const handleOpenStatusToggleModal = (cardId, currentStatus, cardTitle) => {
    setCardToToggleStatus({ id: cardId, currentStatus, title: cardTitle });
    setShowStatusToggleModal(true);
  };

  // called when user confirms changing the status.
  const handleConfirmStatusToggle = async () => {
    if (!cardToToggleStatus) return;
    const { id, currentStatus, title } = cardToToggleStatus;
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await updateLoyaltyCardStatus(id, newStatus);
      // update the card in our local list.
      setAllCards(prevCards =>
        prevCards.map(card =>
          card.id === id ? { ...card, status: newStatus } : card
        )
      );
      addToast({ type: 'success', title: 'Status Updated', message: `Card "${title}" is now ${newStatus}.` });
    } catch (error) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to update card status.' });
    }
    setShowStatusToggleModal(false); // close the pop-up.
    setCardToToggleStatus(null); // clear the stored card info.
  };

  // called when user cancels changing the status.
  const handleCancelStatusToggle = () => {
    setShowStatusToggleModal(false);
    setCardToToggleStatus(null);
  };

  // --- delete logic ---
  // opens the confirmation pop-up for deleting a card.
  const handleOpenDeleteModal = (cardId, cardTitle) => {
    setCardToDeleteId(cardId);
    setCardToDeleteTitle(cardTitle);
    setShowDeleteModal(true);
  };

  // called when user confirms deleting the card.
  const handleConfirmDelete = async () => {
    if (cardToDeleteId) {
      try {
        await deleteLoyaltyCard(cardToDeleteId);
        // remove the card from our local list.
        setAllCards(prevCards => prevCards.filter(card => card.id !== cardToDeleteId));
        addToast({ type: 'success', title: 'Success', message: `Card "${cardToDeleteTitle}" successfully deleted.` });
      } catch (error) {
        addToast({ type: 'error', title: 'Error', message: 'Failed to delete card.' });
      }
    }
    setShowDeleteModal(false); // close the pop-up.
    setCardToDeleteId(null); // clear stored card id.
    setCardToDeleteTitle(''); // clear stored card title.
  };

  // called when user cancels deleting the card.
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCardToDeleteId(null);
    setCardToDeleteTitle('');
  };
  
  // creates a list of status tags (like "active", "stamp") for a card.
  const generateStatusTags = (card) => {
    if (card.isPlaceholder) return []; // no tags for the placeholder.
    const tags = [];
    if (card.status) {
      tags.push({ text: card.status.charAt(0).toUpperCase() + card.status.slice(1), type: card.status });
    }
    if (card.cardType) {
      tags.push({ text: card.cardType, type: 'type' });
    }
    return tags;
  };
  
  // creates a list of action icons (like edit, delete) for a card.
  const generateActionIcons = (card) => {
    if (card.isPlaceholder) return []; // no actions for the placeholder.
    return [
      { id: 'power', iconName: 'Power', label: 'Toggle Status', action: () => handleOpenStatusToggleModal(card.id, card.status, card.title) },
      { id: 'edit', iconName: 'Edit2', label: 'Edit Card', action: () => navigate(`/loyalty-cards/edit/${card.id}`) },
      { id: 'copy', iconName: 'Copy', label: 'Duplicate Card', action: () => {
          addToast({type: 'info', title: 'Coming Soon', message: 'Duplicate feature will be available later.'});
        } 
      },
      { id: 'delete', iconName: 'Trash2', label: 'Delete Card', action: () => handleOpenDeleteModal(card.id, card.title) },
    ];
  };

  // decides whether to show an image or a lucide icon.
  const renderIcon = (iconName, props = { size: 18 }, isOverlay = false) => {
    // if iconName looks like an image file (e.g., ends with .png).
    if (iconName && typeof iconName === 'string' && iconName.endsWith('.png')) {
      const imageProps = isOverlay 
        ? { className: styles.overlayImageActual, style: { width: props.size || 72, height: props.size || 72 } } 
        : { className: styles.actionButtonImage, style: { width: props.size || 18, height: props.size || 18 } }; 
      return <img src={`/images/${iconName}`} alt={iconName.replace('.png', '')} {...imageProps} />;
    }

    // otherwise, try to render a lucide icon from our map.
    const IconComponent = iconMap[iconName];
    // icons in buttons are decorative (aria-hidden) because the button itself has a label.
    return IconComponent ? <IconComponent {...props} aria-hidden="true" /> : <CreditCard {...props} aria-hidden="true" />; // fallback to creditcard icon.
  };


  // if still loading cards, show a loading message.
  if (isLoading) {
    return <div style={{padding: '50px', textAlign: 'center'}} role="status" aria-live="polite">Loading loyalty cards...</div>;
  }

  // this is the html structure of the page.
  return (
    <main 
      className={`${styles.loyaltyCardsPage} ${!isMenuOpen ? styles.menuClosed : ''}`}
      role="main"
      aria-labelledby="page-heading"
    >
      {/* this header area stays at the top when scrolling. */}
      <div className={styles.stickyHeaderArea}>
        <header className={styles.header}>
          <h1 id="page-heading">Loyalty Cards</h1>
          <div className={styles.notificationButtonWrapper}>
            <button
              className={styles.notificationBtn}
              onClick={toggleNotificationModal}
              onMouseDown={handleNotificationButtonMouseDown}
              aria-label="View notifications"
              aria-haspopup="true" // tells screen readers it opens a pop-up.
              aria-expanded={isNotificationModalOpen} // tells if pop-up is open.
            >
              <BellIcon size={24} aria-hidden="true"/>
            </button>
            {/* if notification modal should be open, show it. */}
            {isNotificationModalOpen && <NotificationModal onClose={() => setIsNotificationModalOpen(false)} />}
          </div>
        </header>

        {/* filter bar section. */}
        <div className={styles.filterBarContainer} role="search" aria-labelledby="filter-bar-heading">
          <span id="filter-bar-heading" className={styles.filterLabel}>Filter by:</span>
          {/* status filter dropdown. */}
          <label htmlFor="status-filter" className="visually-hidden">Filter by status</label>
          <select id="status-filter" className={styles.filterDropdown} value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="">Status</option> 
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {/* type filter dropdown. */}
          <label htmlFor="type-filter" className="visually-hidden">Filter by type</label>
          <select id="type-filter" className={styles.filterDropdown} value={typeFilter} onChange={handleTypeFilterChange}>
            <option value="">Type</option> 
            <option value="Stamp">Stamp Card</option>
            <option value="Membership">Membership</option>
            <option value="Discount">Discount</option>
            <option value="Reward">Reward</option>
            <option value="Coupon">Coupon</option>
            <option value="Cashback">Cashback</option>
            <option value="Gift">Gift</option>
            <option value="Multipass">Multipass</option>
            <option value="Custom">Custom</option>
          </select>
          {/* search input. */}
          <div className={styles.searchInputContainer}>
            <Search size={18} className={styles.searchIcon} aria-hidden="true" />
            <label htmlFor="search-cards-input" className="visually-hidden">Search loyalty cards</label>
            <input 
              type="text" 
              id="search-cards-input"
              placeholder="Search" 
              className={styles.searchInput} 
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search loyalty cards by name"
            />
          </div>
        </div>
      </div>

      {/* area where all the cards are displayed. */}
      <div className={styles.cardsDisplayArea}>
        {/* loop through each card and create its display element. */}
        {displayedCards.map(card => {
          const statusTags = generateStatusTags(card);
          const actionIcons = generateActionIcons(card);
          
          const cardTitleId = `card-title-${card.id}`; // unique id for the card title for accessibility.
          // get the icon/image for the card preview.
          const overlayIconRendered = renderIcon(card.overlayIconName, { 
            size: 72, // size for the overlay icon.
          }, true); // 'true' means it's an overlay icon.
          // get the icon/image for the main button on the card.
          const buttonIconRendered = renderIcon(card.buttonIconName, { size: 20, strokeWidth: 2.5 });

          return (
            <article key={card.id} className={styles.cardItem} aria-labelledby={cardTitleId}>
              <h2 id={cardTitleId} className={styles.cardTitle}>{card.title}</h2>
              <div className={styles.phoneImageContainer}>
                {/* if there's an overlay icon, show it. */}
                {card.overlayIconName && 
                  <div className={styles.overlayIconContainer}>
                    {overlayIconRendered}
                  </div>
                }
                {/* the phone image itself. */}
                <img src={card.phoneImage || '/images/phone.png'} alt={`${card.title} card preview`} className={styles.phoneImage} />
              </div>
              {/* the main action button for the card. */}
              <button 
                className={`${styles.actionButton} ${card.buttonType === 'primary' ? styles.primaryButton : styles.secondaryButton}`}
                onClick={() => {
                  // if it's the placeholder, go to create page. otherwise, go to edit page.
                  if (card.isPlaceholder) { 
                    navigate('/loyalty-cards/create');
                  } else {
                    navigate(`/loyalty-cards/edit/${card.id}`);
                  }
                }}
                aria-label={card.isPlaceholder ? card.buttonText : `${card.buttonText} for ${card.title}`}
              >
                {/* if there's a button icon, show it. */}
                {card.buttonIconName && <span className={styles.buttonIconWrapper} aria-hidden="true">{buttonIconRendered}</span>}
                {card.buttonText}
              </button>
              {/* if there are status tags, show them. */}
              {statusTags.length > 0 && (
                <div className={styles.statusTags} aria-label={`Status tags for ${card.title}`}>
                  {statusTags.map((tag, index) => ( 
                    <span key={`${card.id}-tag-${tag.text}-${index}`} className={`${styles.statusTag} ${styles[tag.type + 'Tag']}`}>
                      {tag.text}
                    </span>
                  ))}
                </div>
              )}
              {/* if there are action icons, show them. */}
              {actionIcons.length > 0 && ( 
                <div className={styles.actionIcons} role="toolbar" aria-label={`Actions for ${card.title}`}>
                  {actionIcons.map((action) => (
                    <button 
                      key={`${card.id}-action-${action.id}`} 
                      className={styles.iconButton} 
                      aria-label={`${action.label} ${card.title}`}
                      onClick={action.action}
                    >
                      {renderIcon(action.iconName)}
                    </button>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
      {/* delete confirmation pop-up. */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete "${cardToDeleteTitle}"?`}
        message="This action cannot be undone."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />

      {/* status toggle confirmation pop-up. */}
      {cardToToggleStatus && ( // only render if there's a card to toggle.
        <ConfirmationModal
          isOpen={showStatusToggleModal}
          onClose={handleCancelStatusToggle}
          onConfirm={handleConfirmStatusToggle}
          title={`Are you sure you want to ${cardToToggleStatus.currentStatus === 'active' ? 'deactivate' : 'activate'} "${cardToToggleStatus.title}"?`}
          message="You can always change this later."
          confirmButtonText="Confirm"
          cancelButtonText="Cancel"
        />
      )}
    </main>
  );
};

export default LoyaltyCardsPage;
