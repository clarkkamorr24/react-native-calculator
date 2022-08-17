import React, {createContext, useState, useEffect} from 'react';

export const VerifyContext = createContext();
const {Provider} = VerifyContext;

const initialState = {
  displayValue: '0',
  lastValue: 0,
  calculatorState: 1,
  currentOperator: null,
  expectingSecondNumber: false,
};

export const VerifyContextProvider = ({children}) => {
  const [state, setState] = useState(initialState);

  return <Provider value={{state, setState}}>{children}</Provider>;
};
