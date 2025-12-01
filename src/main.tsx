import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import "../tailwind.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.tsx';
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from './contexts/AuthContext';
import Cart from './pages/Cart';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/dashboard/*' element={<App />} />
          <Route path='/cart' element={<AuthProvider><Cart /></AuthProvider>} />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode >
);
