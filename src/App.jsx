import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RedirectPage from './pages/RedirectPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/:id' element={<RedirectPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
