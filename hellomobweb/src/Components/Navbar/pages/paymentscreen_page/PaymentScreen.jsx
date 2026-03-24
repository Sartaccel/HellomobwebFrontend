import React, { useState } from 'react';
import './PaymentScreen.css';

const PaymentScreen = () => {
  const [payWith, setPayWith] = useState('card');
  const [upiApp, setUpiApp] = useState('gpay');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [paymentErrors, setPaymentErrors] = useState({});

  const handleCardNumberChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = onlyDigits.replace(/(.{4})/g, '$1 ').trim();
    setCardData((prev) => ({ ...prev, cardNumber: formatted }));
    setPaymentErrors((prev) => ({ ...prev, cardNumber: '' }));
  };

  const handleExpiryChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 4);
    const formatted = onlyDigits.length > 2 ? `${onlyDigits.slice(0, 2)}/${onlyDigits.slice(2)}` : onlyDigits;
    setCardData((prev) => ({ ...prev, expiry: formatted }));
    setPaymentErrors((prev) => ({ ...prev, expiry: '' }));
  };

  const handleCvvChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardData((prev) => ({ ...prev, cvv: onlyDigits }));
    setPaymentErrors((prev) => ({ ...prev, cvv: '' }));
  };

  const handlePayClick = () => {
    if (isPaymentLoading) {
      return;
    }

    const newErrors = {};

    if (payWith === 'card') {
      const cardDigits = cardData.cardNumber.replace(/\s/g, '');
      if (!cardDigits) {
        newErrors.cardNumber = 'Card number is required';
      } else if (cardDigits.length !== 16) {
        newErrors.cardNumber = 'Enter valid 16 digit card number';
      }

      if (!cardData.expiry) {
        newErrors.expiry = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiry)) {
        newErrors.expiry = 'Use format MM/YY';
      }

      if (!cardData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3}$/.test(cardData.cvv)) {
        newErrors.cvv = 'Enter valid 3 digit CVV';
      }
    }

    if (payWith === 'upi' && !upiApp) {
      newErrors.upiApp = 'Please select UPI app';
    }

    setPaymentErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsPaymentLoading(true);

    setTimeout(() => {
      setIsPaymentLoading(false);
    }, 2500);
  };

  return (
    <div className="payment-page">
      <div className="payment-layout">
        <section className="payment-panel">
          <h2 className="panel-title">Payment</h2>

          <div className="pay-with">
            <p>Pay With:</p>
            <label>
              <input
                type="radio"
                name="payWith"
                value="card"
                checked={payWith === 'card'}
                onChange={(e) => {
                  setPayWith(e.target.value);
                  setPaymentErrors({});
                }}
              />
              <span>Card</span>
            </label>
            <label>
              <input
                type="radio"
                name="payWith"
                value="upi"
                checked={payWith === 'upi'}
                onChange={(e) => {
                  setPayWith(e.target.value);
                  setPaymentErrors({});
                }}
              />
              <span>UPI</span>
            </label>
          </div>

          {payWith === 'card' ? (
            <>
              <div className="field-wrap">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9101 1121"
                  maxLength={19}
                  value={cardData.cardNumber}
                  onChange={handleCardNumberChange}
                  className={paymentErrors.cardNumber ? 'input-error' : ''}
                />
                {paymentErrors.cardNumber && <span className="payment-error">{paymentErrors.cardNumber}</span>}
              </div>

              <div className="split-fields">
                <div className="field-wrap">
                  <label htmlFor="expiry">Expiration Date</label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardData.expiry}
                    onChange={handleExpiryChange}
                    className={paymentErrors.expiry ? 'input-error' : ''}
                  />
                  {paymentErrors.expiry && <span className="payment-error">{paymentErrors.expiry}</span>}
                </div>

                <div className="field-wrap">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    id="cvv"
                    type="password"
                    placeholder="123"
                    maxLength={3}
                    value={cardData.cvv}
                    onChange={handleCvvChange}
                    className={paymentErrors.cvv ? 'input-error' : ''}
                  />
                  {paymentErrors.cvv && <span className="payment-error">{paymentErrors.cvv}</span>}
                </div>
              </div>

              <label className="save-card">
                <input type="checkbox" />
                <span>Save card details</span>
              </label>
            </>
          ) : (
            <div className="upi-options-wrap">
              <p className="upi-title">Choose UPI App</p>

              <label className="upi-option">
                <input
                  type="radio"
                  name="upiApp"
                  value="gpay"
                  checked={upiApp === 'gpay'}
                  onChange={(e) => setUpiApp(e.target.value)}
                />
                <span>GPay</span>
              </label>

              <label className="upi-option">
                <input
                  type="radio"
                  name="upiApp"
                  value="phonepe"
                  checked={upiApp === 'phonepe'}
                  onChange={(e) => setUpiApp(e.target.value)}
                />
                <span>PhonePe</span>
              </label>

              <label className="upi-option">
                <input
                  type="radio"
                  name="upiApp"
                  value="other"
                  checked={upiApp === 'other'}
                  onChange={(e) => setUpiApp(e.target.value)}
                />
                <span>Other UPI App</span>
              </label>

              {paymentErrors.upiApp && <span className="payment-error">{paymentErrors.upiApp}</span>}
            </div>
          )}

          <button className="pay-btn" type="button" onClick={handlePayClick} disabled={isPaymentLoading}>
            {payWith === 'upi' ? 'Pay with UPI ₹899' : 'Pay ₹899'}
          </button>

          <p className="privacy-note">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
          </p>
        </section>

        <section className="summary-panel">
          <h2 className="panel-title summary-title">Order Summary</h2>

          <div className="product-row">
            <div className="product-thumb">👜</div>
            <div className="product-info">
              <p className="name">Taxmax Leather Bag</p>
              <p className="meta">Brown Vegan Leather</p>
            </div>
            <div className="product-price">
              <p>₹4439</p>
              <small>Qty: 2</small>
            </div>
          </div>

          <div className="coupon-row">
            <input type="text" placeholder="Gift or discount code" />
            <button type="button">Apply</button>
          </div>

          <div className="total-lines">
            <div><span>Subtotal</span><strong>₹4439</strong></div>
            <div><span>Shipping</span><strong>₹50</strong></div>
          </div>

          <div className="grand-total">
            <div>
              <p>Total</p>
              <small>Including $2.24 in taxes</small>
            </div>
            <h3>₹4489</h3>
          </div>
        </section>
      </div>

      {isPaymentLoading && (
        <div
          className="upi-loading-overlay"
          aria-live="polite"
          aria-label={payWith === 'upi' ? 'Opening UPI app' : 'Processing card payment'}
        >
          <div className="upi-loader" />
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
