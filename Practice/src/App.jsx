import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import About from './pages/about/About'
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Footer from './components/footer/Footer'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer/>
    </ThemeProvider>
  )
}

export default App
