
import React from 'react';
import './App.css'
import { CssBaseline } from '@mui/material';
import QuotesView from '@app/pages/QuotesView/QuotesView';
import Header from './components/layout/Header/Header';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <QuotesView />
    </>
  );
};

export default App;