import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginProvider from "./contexts/LoginProvider";
import App from './App';
import Footer from "./routes/Footer";
import Header from "./routes/Header";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import ListManager from './routes/ListManager';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/lists" element={<ListManager />} />
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
