import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Workspace from './pages/Workspace';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: false,
      offset: 40
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
