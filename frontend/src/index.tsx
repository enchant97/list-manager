/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { LoginProvider } from './contexts/LoginProvider';
import { Route, Router, Routes } from '@solidjs/router';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './views/Login';
import Logout from './views/Logout';
import Lists from './views/Lists';
import Items from './views/Items';
import NewItem from './views/NewItem';
import { ModalController, ModalProvider } from './contexts/ModalProvider';

render(() =>
  <LoginProvider>
    <ModalProvider>
      <Router>
        <ModalController />
        <Header />
        <Routes>
          <Route path='/' component={App} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/lists'>
            <Route path='/' component={Lists} />
            <Route path='/:list_id'>
              <Route path='/' component={Items} />
              <Route path='/new' component={NewItem} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </ModalProvider>
  </LoginProvider>,
  document.getElementById('root') as HTMLElement
);
