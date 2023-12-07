import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RedirectPage from './pages/RedirectPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/:id' element={<RedirectPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
