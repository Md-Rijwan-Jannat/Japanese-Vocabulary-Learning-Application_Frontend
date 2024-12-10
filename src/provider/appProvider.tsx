'use client';

import { persistor, store } from '@/redux/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        {' '}
        <Toaster position="top-center" className="bg-primary text-white" />
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default AppProvider;
