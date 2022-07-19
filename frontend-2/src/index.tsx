/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import LoginProvider from './contexts/LoginProvider';
import { Router } from 'solid-app-router';
import Header from './components/Header';
import Footer from './components/Footer';

render(() =>
  <LoginProvider>
    <Router>
      <Header />
      <App />
      <Footer />
    </Router>
  </LoginProvider>,
  document.getElementById('root') as HTMLElement
);
