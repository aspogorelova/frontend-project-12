import React from 'react';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import LoginPage from './pages/LoginPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AuthContext from '../context/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRote = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to='login' state={{ from: location }}></Navigate>
  )
}

const AuthButton = () => {
  // Здесь будет кнопка Выйти
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button>Выйти</Button>
      : null
  )
}

function App() {
  return (
    <Container fluid className="h-100">
      <AuthProvider>
        <Router>
          <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
            <Container>
              <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
              <AuthButton></AuthButton>
            </Container>
          </Navbar>

          <Routes>
            <Route path='/' element={(
              <PrivateRote>
                <h1>CHAT</h1>
              </PrivateRote>
            )}></Route>
            <Route path='login' element={<LoginPage />}>
            </Route>
            <Route path='*' element={<ErrorPage />} />

          </Routes>
        </Router>
      </AuthProvider>
    </Container>
  )
}

export default App;
