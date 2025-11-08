import { createContext, useContext } from 'react';

const PaymentContext = createContext();

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }) => {
  const createSession = async () => {
    // Mock payment session creation
    console.log('Creating payment session for route protection...');
    // Simulate payment
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Payment session created successfully.');
  };

  return (
    <PaymentContext.Provider value={{ createSession }}>
      {children}
    </PaymentContext.Provider>
  );
};