import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthToken, logOut, logIn } from '../slices/authSlice.js';
import { Button, Navbar, Container, Row } from 'react-bootstrap';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';

const handleLogout = (dispatch) => {
  localStorage.removeItem('jwttoken');
  dispatch(logOut());
}

const AuthButton = () => {
  const token = useSelector(selectAuthToken);
  const dispatch = useDispatch();

  return (
    token ? <Button onClick={() => handleLogout(dispatch)}>Выйти</Button> : null
  );
}

const PrivateRoute = ({ children }) => {
  const token = useSelector(selectAuthToken);
  const location = useLocation();

  return token ? children : <Navigate to='login' state={{ from: location }}></Navigate>;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {    
    const user = localStorage.getItem('username');
    const tokenFromLocalStorage = localStorage.getItem('jwttoken');
    if (user && tokenFromLocalStorage) {
      dispatch(logIn({ user, token: tokenFromLocalStorage }));
    }
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            <AuthButton></AuthButton>
          </Container>
        </Navbar>

        <Routes>
          <Route path='/' element={
            <PrivateRoute>
              <Container className="h-100 my-4 overflow-hidden rounded shadow">
                <Row className="h-100 bg-white flex-md-row">
                  <Channels />
                  <Chat />
                </Row>
              </Container>
            </PrivateRoute>
          } />
          <Route path='login' element={<LoginPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
