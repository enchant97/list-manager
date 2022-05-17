import React from 'react';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
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
import NewItem from './routes/NewItem';
import NotFound from './routes/NotFound';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/lists" element={<ListManager />} />
          <Route path="/lists/new" element={<NewList />} />
          <Route path="/lists/:list_id" element={<ItemManager />} />
          <Route path="/lists/:list_id/new-item" element={<NewItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
