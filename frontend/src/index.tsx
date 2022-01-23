import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginProvider from "./contexts/LoginProvider";
import App from './App';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import ListManager from './routes/ListManager';
import ItemManager from './routes/ItemManager';
import NewList from './routes/NewList';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/lists" element={<ListManager />} />
          <Route path="/lists/new" element={<NewList />} />
          <Route path="/lists/:list_id" element={<ItemManager />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
