/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import LoginProvider from './contexts/LoginProvider';
import { Route, Router, Routes } from 'solid-app-router';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './views/Login';
import Logout from './views/Logout';
import Lists from './views/Lists';
import NewList from './views/NewList';

render(() =>
  <LoginProvider>
    <Router>
      <Header />
      <Routes>
        <Route path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='/lists'>
        <Route path='/' component={Lists} />
          <Route path='/new' component={NewList} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  </LoginProvider>,
  document.getElementById('root') as HTMLElement
);
