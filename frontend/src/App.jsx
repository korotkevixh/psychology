import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Instruction from './components/Instruction';
import Test from './components/Test';
import Results from './components/Results';
import Profile from './components/Profile';
import Layout from './components/Layout';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TestList from './components/TestList';
import AdminPanel from './components/AdminPanel';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tests" element={<TestList />} />
        <Route path="/instruction" element={<Instruction />} />
        <Route path="/test" element={<Test />} />
        <Route path="/results" element={<Results />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Layout>
  )
}

export default App
