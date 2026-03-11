import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { TestGallery } from './pages/TestGallery.tsx'
import { TermsAndConditions } from './pages/TermsAndConditions.tsx'
import { PrivacyPolicy } from './pages/PrivacyPolicy.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test/:count" element={<TestGallery />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
