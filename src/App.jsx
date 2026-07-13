<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Toast from './components/Toast'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toast />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
          },
        }}
      />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
=======
﻿import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TaskProvider } from './store/TaskContext'
import Layout from './components/Layout'
import Inbox from './pages/Inbox'
import Today from './pages/Today'
import Projects from './pages/Projects'

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Inbox />} />
            <Route path="/today" element={<Today />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  )
}

export default App
>>>>>>> 919c478c0c15e43df7f628bb7cf3a126fbf1c158
