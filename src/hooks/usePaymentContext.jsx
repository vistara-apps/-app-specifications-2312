import { createContext, useContext } from 'react';

const PaymentContext = createContext();

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }) => {
  return (
    <PaymentContext.Provider value={{}}>
      {children}
    </PaymentContext.Provider>
  );
};