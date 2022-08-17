import React from 'react';
import {VerifyContextProvider, Calculator} from './components';

const App = () => {
  return (
    <VerifyContextProvider>
      <Calculator />
    </VerifyContextProvider>
  );
};

export default App;
