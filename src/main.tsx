
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ReactGA from 'react-ga4';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { inject } from '@vercel/analytics';
inject();// for vercel analytics



ReactGA.initialize('G-5T4QNS4SXJ'); // to track page views from google analytics using google measurement Id
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
<BrowserRouter>

    <App />
    </BrowserRouter>
</HelmetProvider>

  </React.StrictMode>
);
