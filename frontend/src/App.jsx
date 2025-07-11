import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';
import WieZijnWe from './pages/WieZijnWe.jsx';
import Partners from './pages/Partners.jsx';
import Notificaties from './pages/Notificaties.jsx';
import CMSDashboard from './pages/CMSDashboard.jsx';
import CMSEditor from './pages/CMSEditor.jsx';
import OuderBeheer from './pages/OuderBeheer.jsx';
import SuperDashboard from './pages/SuperDashboard.jsx';
import Support from './pages/Support.jsx';
import SupportDashboard from './pages/SupportDashboard.jsx';
import BoekPlaats from './pages/BoekPlaats.jsx';
import StatistiekenDashboard from './pages/StatistiekenDashboard.jsx';
import Footer from './components/Footer.jsx';
import NavBar from './components/NavBar.jsx';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/wie-zijn-we" element={<WieZijnWe />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/notificaties" element={<Notificaties />} />
        <Route path="/cms" element={<CMSDashboard />} />
        <Route path="/cms/:slug" element={<CMSEditor />} />
        <Route path="/ouderbeheer" element={<OuderBeheer />} />
        <Route path="/superdashboard" element={<SuperDashboard />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support-dashboard" element={<SupportDashboard />} />
        <Route path="/boek-plaats/:providerId" element={<BoekPlaats />} />
        <Route path="/statistieken" element={<StatistiekenDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
