import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './contexts/ThemeContext'
import Home from './pages/Home'

const StatsPage = lazy(() => import('./pages/StatsPage'))

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <main className="page-container" aria-live="polite">
              Đang tải trang...
            </main>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
