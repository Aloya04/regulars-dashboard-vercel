import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Plus
} from 'lucide-react';
import styles from './CreateLoyaltyCardPage.module.css';
import { addLoyaltyCard, getLoyaltyCardById, updateLoyaltyCard } from '../../services/loyaltyCardService';


const cardTypeDetails = [
  { name: "Stamp", displayName: "Stamp", imageFileName: "stamp.png" },
  { name: "Membership", displayName: "Membership", imageFileName: "membership.png" },
  { name: "Discount", displayName: "Discount", imageFileName: "discount.png" },
  { name: "Reward", displayName: "Reward", imageFileName: "reward.png" },
  { name: "Coupon", displayName: "Coupon", imageFileName: "coupon.png" },
  { name: "Cashback", displayName: "Cashback", imageFileName: "cashback.png" },
  { name: "Gift", displayName: "Gift", imageFileName: "gift.png" },
  { name: "Multipass", displayName: "Multipass", imageFileName: "multipass.png" },
  { name: "Custom", displayName: "Custom", imageFileName: "custom.png" },
];

// a small helper function to show an image for the card type picker.
const renderPickerItem = (imageFileName, displayName) => {
  // all our types should have an image, so we just show it.
  return <img src={`/images/${imageFileName}`} alt={displayName} className={styles.pickerImage} />;
};


// 'isMenuOpen' tells us if the sidebar is open.
// 'isEditMode' tells us if we're editing an existing card or creating a new one.
// 'addToast' is a function to show pop-up messages.
const CreateLoyaltyCardPage = ({ isMenuOpen, isEditMode, addToast }) => {
  const navigate = useNavigate(); // for changing pages.
  const { cardId } = useParams(); // if we're editing, this gets the card's id from the url.

  // these are state variables to keep track of the form inputs.
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('active'); // 'active' or 'inactive'.
  const [cardType, setCardType] = useState(cardTypeDetails[0].name); // default to the first card type.
  const [overlayIconName, setOverlayIconName] = useState(cardTypeDetails[0].imageFileName); // image for the preview.
  const [initialStampAmount, setInitialStampAmount] = useState('');
  const [totalStampAmount, setTotalStampAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // true when the form is being saved.
  const [isLoading, setIsLoading] = useState(false); // true when loading data for editing.

  // this 'useEffect' updates the preview icon whenever the card type changes.
  useEffect(() => {
    const selectedTypeDetail = cardTypeDetails.find(detail => detail.name === cardType);
    if (selectedTypeDetail) {
      setOverlayIconName(selectedTypeDetail.imageFileName);
    }
  }, [cardType]); // runs when 'cardType' changes.

  // this 'useEffect' loads the card data if we're in edit mode.
  useEffect(() => {
    if (isEditMode && cardId) {
      setIsLoading(true);
      getLoyaltyCardById(cardId)
        .then(cardData => {
          if (cardData) {
            // fill the form fields with the loaded data.
            setTitle(cardData.title);
            setStatus(cardData.status);
            setCardType(cardData.cardType);
            setInitialStampAmount(cardData.initialStampAmount?.toString() || '');
            setTotalStampAmount(cardData.totalStampAmount?.toString() || '');
          } else {
            // if the card isn't found, show an error and go back to the main cards page.
            addToast({ type: 'error', message: 'Loyalty card not found.' });
            navigate('/loyalty-cards');
          }
        })
        .catch(error => {
          addToast({ type: 'error', message: 'Failed to load card data for editing.' });
        })
        .finally(() => setIsLoading(false)); // stop loading indicator.
    }
  }, [cardId, isEditMode, navigate, addToast]); // runs if these values change.

  // this function is called when the user submits the form.
  const handleSubmit = async (event) => {
    event.preventDefault(); // stops the default browser form submission.
    if (!title.trim()) {
        addToast({type: 'error', message: 'Card name is required.'});
        return; // stop if card name is empty.
    }
    setIsSubmitting(true); // show that we're saving.

    // convert stamp amounts from text to numbers.
    const parsedInitialStamp = initialStampAmount.trim() !== '' ? parseInt(initialStampAmount, 10) : null;
    const parsedTotalStamp = totalStampAmount.trim() !== '' ? parseInt(totalStampAmount, 10) : null;

    // check if stamp amounts are valid.
    let stampFieldsAreValid = true;
    if (parsedInitialStamp !== null && (isNaN(parsedInitialStamp) || parsedInitialStamp < 0)) {
      addToast({ type: 'error', message: "Initial stamp amount must be zero or positive."});
      stampFieldsAreValid = false;
    }
    if (parsedTotalStamp !== null && (isNaN(parsedTotalStamp) || parsedTotalStamp <= 0)) {
      addToast({ type: 'error', message: "Total stamps must be a positive number."});
      stampFieldsAreValid = false;
    }
    if (parsedInitialStamp !== null && parsedTotalStamp !== null && parsedInitialStamp > parsedTotalStamp) {
       addToast({ type: 'error', message: "Initial stamps cannot exceed total stamps."});
       stampFieldsAreValid = false;
    }

    // for "stamp" type cards, both stamp fields are required.
    if (cardType === 'Stamp') {
      if (parsedInitialStamp === null || parsedTotalStamp === null) {
        addToast({ type: 'error', message: "For Stamp cards, initial and total stamp amounts are required."});
        stampFieldsAreValid = false;
      }
    }
    
    if (!stampFieldsAreValid) {
      setIsSubmitting(false); // stop saving if validation failed.
      return;
    }

    // prepare the card data to be saved.
    const cardData = {
      title: title.trim(),
      status,
      cardType,
      overlayIconName, 
      phoneImage: '/images/phone.png', // default phone image.
      buttonText: 'View card',        // default button text.
      buttonType: 'secondary',       // default button type.
    };

    // add stamp amounts to cardData if they are valid numbers.
    if (parsedInitialStamp !== null && !isNaN(parsedInitialStamp)) {
      cardData.initialStampAmount = parsedInitialStamp;
    }
    if (parsedTotalStamp !== null && !isNaN(parsedTotalStamp)) {
      cardData.totalStampAmount = parsedTotalStamp;
    }
    
    try {
      if (isEditMode && cardId) {
        // if editing, update the existing card.
        await updateLoyaltyCard(cardId, cardData);
        addToast({ type: 'success', title: 'Success', message: 'Your card has been updated!' });
      } else {
        // if creating, add a new card.
        await addLoyaltyCard(cardData);
        addToast({ type: 'success', title: 'Success', message: 'Your card is now live!' });
      }
      navigate('/loyalty-cards'); // go back to the main cards page.
    } catch (error) {
      addToast({ type: 'error', title: 'Error', message: `Failed to ${isEditMode ? 'update' : 'save'} card. Please try again.` });
    } finally {
      setIsSubmitting(false); // done saving.
    }
  };
  
  // determine the image source for the preview.
  const previewImageSrc = overlayIconName ? `/images/${overlayIconName}` : `/images/custom.png`;

  // if loading data for edit mode, show a loading message.
  if (isLoading && isEditMode) {
    return <div className={styles.loadingContainer} role="status" aria-live="polite">Loading card details...</div>;
  }

  // find the details for the currently selected card type for the preview.
  const currentCardTypeDetail = cardTypeDetails.find(detail => detail.name === cardType);

  // this is the html structure of the page.
  return (
    <main 
      className={`${styles.createCardPage} ${!isMenuOpen ? styles.menuClosed : ''}`}
      role="main"
      aria-labelledby="page-heading"
    >
      {/* this header stays at the top when scrolling. */}
      <div className={styles.stickyHeaderArea}>
        <header className={styles.header}>
          <h1 id="page-heading">{isEditMode ? 'Edit Loyalty Card' : 'Choose card type'}</h1>
        </header>
      </div>

      {/* this wraps the main form and the preview section. */}
      <div className={styles.contentWrapper}>
        {/* main form column. */}
        <div className={styles.mainFormArea}>
          <form onSubmit={handleSubmit} className={styles.formContainer} aria-labelledby="card-form-heading">
            {/* card type picker section. */}
            <div className={styles.formGroup}>
                 <label id="card-type-label" htmlFor="cardTypePickerButtons">Card type</label>
              <div className={styles.cardTypePicker} role="radiogroup" aria-labelledby="card-type-label" id="cardTypePickerButtons">
                {/* create a button for each card type. */}
                {cardTypeDetails.map(detail => (
                  <button
                    type="button" // important: make these not submit the form.
                    key={detail.name}
                    role="radio" // for accessibility, acts like a radio button.
                    aria-checked={cardType === detail.name} // tells screen readers if it's selected.
                    className={`${styles.cardTypeButton} ${cardType === detail.name ? styles.selectedCardType : ''}`}
                    onClick={() => setCardType(detail.name)} // update card type on click.
                    aria-label={detail.displayName}
                  >
                    <div className={styles.cardTypeIconWrapper} aria-hidden="true">
                      {renderPickerItem(detail.imageFileName, detail.displayName)}
                    </div>
                    <span>{detail.displayName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* other form fields. */}
            <div className={styles.formGroup}>
              <label htmlFor="title">Card name</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a name for this card"
                required // this field must be filled.
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label id="status-label">Status</label> 
              <div className={styles.statusButtonGroup} role="radiogroup" aria-labelledby="status-label">
                <button
                  type="button"
                  role="radio"
                  aria-checked={status === 'active'}
                  className={`${styles.statusButton} ${status === 'active' ? styles.activeStatus : ''}`}
                  onClick={() => setStatus('active')}
                  aria-label="Set status to Active"
                >
                  Active
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={status === 'inactive'}
                  className={`${styles.statusButton} ${status === 'inactive' ? styles.activeStatus : ''}`}
                  onClick={() => setStatus('inactive')}
                  aria-label="Set status to Inactive"
                >
                  Inactive
                </button>
              </div>
            </div>

            {/* stamp amount fields are always visible. */}
            <>
              <div className={styles.formGroup}>
                <label htmlFor="initialStampAmount">Initial stamp amount</label>
                <input
                  type="number"
                  id="initialStampAmount"
                  value={initialStampAmount}
                  onChange={(e) => setInitialStampAmount(e.target.value)}
                  min="0" // minimum value is 0.
                  placeholder="e.g., 0 or 2"
                  // for accessibility, link to requirement text if it's a stamp card.
                  aria-describedby={cardType === 'Stamp' ? "stamp-card-requirement" : undefined}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="totalStampAmount">Total stamp amount</label>
                <input
                  type="number"
                  id="totalStampAmount"
                  value={totalStampAmount}
                  onChange={(e) => setTotalStampAmount(e.target.value)}
                  min="0" 
                  placeholder="e.g., 10"
                  aria-describedby={cardType === 'Stamp' ? "stamp-card-requirement" : undefined}
                />
              </div>
              {/* this text is hidden visually but read by screen readers for stamp cards. */}
              {cardType === 'Stamp' && <p id="stamp-card-requirement" className="visually-hidden">Initial and total stamp amounts are required for Stamp cards.</p>}
            </>
            
            {/* submit button. */}
            <button type="submit" className={styles.submitButton} disabled={isSubmitting || (isLoading && isEditMode)}>
              {isSubmitting ? (
                // if submitting, show a spinner and "saving..." text.
                <>
                  <span className={styles.spinner} aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                // otherwise, show "create card" or "update card".
                <>
                  {isEditMode ? 'Update Card' : 'Create Card'}
                  <Plus size={20} aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* preview column. */}
        <div className={styles.previewContainer} role="region" aria-labelledby="preview-heading">
          <div className={styles.previewSection}>
            <h3 id="preview-heading">Card Preview</h3>
            {/* 'aria-live="polite"' makes screen readers announce changes to the preview. */}
            <div className={styles.cardPreview} aria-live="polite">
              <div className={styles.previewIconArea}>
                <img src={previewImageSrc} alt={`${cardType} card icon`} className={styles.previewImageActual} />
              </div>
              <div className={styles.previewTitle}>{title || "Card Name"}</div>
              {currentCardTypeDetail && <div className={styles.previewCardType}>{currentCardTypeDetail.displayName}</div>}
              {/* show stamp count in preview if values are entered. */}
              {(initialStampAmount.trim() !== '' || totalStampAmount.trim() !== '') && (
                <div className={styles.previewStampCount}>
                  {initialStampAmount || '0'} / {totalStampAmount || '0'} stamps
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateLoyaltyCardPage;
