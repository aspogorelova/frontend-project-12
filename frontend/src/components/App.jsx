import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthToken, logOut, selectAuthUser } from '../slices/authSlice.js'
import { Button, Navbar, Container, Row } from 'react-bootstrap'
import LoginPage from './LoginPage.jsx'
import SignupPage from './SignUpPage.jsx'
import ErrorPage from './ErrorPage.jsx'
import Channels from './Channels.jsx'
import Chat from './Chat.jsx'
import getModal from './getModal.js'
import { setActiveChannel } from '../slices/channelsSlice.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from 'react-i18next'

const handleLogout = dispatch => {
  dispatch(logOut())
  dispatch(setActiveChannel(1))
}

const AuthButton = () => {
  const { t } = useTranslation()
  const token = useSelector(selectAuthToken)
  const dispatch = useDispatch()

  return (
    token ? <Button onClick={() => handleLogout(dispatch)}>{t('common.exit')}</Button> : null
  )
}

const PrivateRoute = ({ children }) => {
  const token = useSelector(selectAuthToken)
  const currentUser = useSelector(selectAuthUser)
  const location = useLocation()

  return token && currentUser
    ? children
    : (
      <Navigate
        to="login"
        state={{ from: location }}
      ></Navigate>
    )
}

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) return null

  const Component = getModal(modalInfo.type)
  return (
    <Component
      onHide={hideModal}
      modalInfo={modalInfo}
    />
  )
}

function App() {
  const dispatch = useDispatch()
  const [modalInfo, setModalInfo] = useState({ type: null, item: null })
  const hideModal = () => setModalInfo({ type: null, item: null })
  const showModal = (type, item = null) => setModalInfo({ type, item })

  useEffect(() => {
    dispatch(setActiveChannel(1))
  }, [])

  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar
          expand="lg"
          variant="light"
          bg="white"
          className="shadow-sm"
        >
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            <AuthButton></AuthButton>
          </Container>
        </Navbar>

        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Container className="h-100 my-4 overflow-hidden rounded shadow">
                  <Row className="h-100 bg-white flex-md-row">
                    <Channels showModal={showModal} />
                    <Chat />
                  </Row>
                  {renderModal({ modalInfo, hideModal })}
                </Container>
              </PrivateRoute>
            )}
          />
          <Route
            path="login"
            element={<LoginPage />}
          />
          <Route
            path="*"
            element={<ErrorPage />}
          />
          <Route
            path="signup"
            element={<SignupPage />}
          />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  )
}

export default App
