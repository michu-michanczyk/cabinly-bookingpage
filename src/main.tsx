import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { TestGallery } from './pages/TestGallery.tsx'
import { TermsAndConditions } from './pages/TermsAndConditions.tsx'
import { PrivacyPolicy } from './pages/PrivacyPolicy.tsx'
import { BookingPage } from './pages/BookingPage.tsx'
import { BookingConfirmed } from './pages/BookingConfirmed.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/cabinly-bookingpage">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test/:count" element={<TestGallery />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/book/dates" element={<BookingPage />} />
        <Route path="/book/guests" element={<BookingPage />} />
        <Route path="/book/extras" element={<BookingPage />} />
        <Route path="/book/details" element={<BookingPage />} />
        <Route path="/book/confirmation" element={<BookingPage />} />
        <Route path="/book/confirmed" element={<BookingConfirmed />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
