import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login.jsx';
import NotFound from './components/pages/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
