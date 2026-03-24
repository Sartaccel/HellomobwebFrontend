import { useState } from 'react';
import './App.css';
import ContactDetails from './Components/Navbar/pages/contactdetails_page/Contact Details';
import PaymentScreen from './Components/Navbar/pages/paymentscreen_page/PaymentScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('contact');

  const handleContinue = () => {
    setCurrentScreen('payment');
  };

  return (
    <div className="App">
      {currentScreen === 'contact' ? (
        <ContactDetails onContinue={handleContinue} />
      ) : (
        <PaymentScreen />
      )}
    </div>
  );
}

export default App;
