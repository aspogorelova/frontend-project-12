import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthFailed, selectAuthError, setAuthData } from '../slices/authSlice.js'
import { useLoginMutation } from '../services/authApi.js'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Card, Image, Button, FormControl, FormGroup, Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import avatarImage from '../assets/avatarAvtor.jpg';

const LoginPage = () => {
  const { t } = useTranslation()

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(t('error.fillInput')),
    password: Yup.string().required(t('error.fillInput')),
  })

  const location = useLocation()
  const previousePath = location.state?.from || '/'
  const navigator = useNavigate()
  const errorMessage = useSelector(selectAuthError)
  const inputRef = useRef()
  const dispatch = useDispatch()
  const [login] = useLoginMutation()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(values).unwrap()
      const token = response.token
      localStorage.setItem('jwttoken', token)
      localStorage.setItem('username', values.username)

      dispatch(setAuthData({
        username: values.username,
        token: token,
      }))

      navigator(previousePath)
    }
    catch (error) {
      console.log('error  ', error)
      if (error.status === 401) {
        console.log('error 401')
        dispatch(setAuthFailed(t('error.failedNameOrPassword')))
      }
      else if (typeof error.status === 'number' && error.status >= 500) {
        toast.error(t('error.errorServer'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        })
      }
      else if (
        error.status === 'FETCH_ERROR'
        || error.message?.includes('Failed to fetch')
        || !navigator.onLine
      ) {
        toast.error(t('error.errorConnect'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        })
      }
      else {
        dispatch(setAuthFailed(t('error.UnknownError')))
      }
    }
    finally {
      setSubmitting(false)
    };
  }

  return (
    <Container
      fluid
      className="h-100"
    >
      <Row className="h-100 justify-content-center align-items-center">
        <Col
          xs={12}
          md={8}
          xxl={6}
        >
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  src={avatarImage}
                  roundedCircle
                  alt="Войти"
                />
              </Col>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">{t('common.enter')}</h1>
                    <FormGroup
                      controlId="username"
                      className="form-floating mb-3"
                    >
                      <Field
                        ref={inputRef}
                        type="text"
                        name="username"
                        required
                        placeholder="Ваш ник"
                        as={FormControl}
                      />
                      <label htmlFor="username">{t('signUpPage.nik')}</label>
                    </FormGroup>
                    <FormGroup
                      controlId="password"
                      className="form-floating mb-4"
                    >
                      <Field
                        type="password"
                        name="password"
                        required
                        placeholder="Пароль"
                        as={FormControl}
                      />
                      <label htmlFor="password">{t('signUpPage.password')}</label>
                      {errorMessage && (
                        <div className="invalid-tooltip">{errorMessage}</div>
                      )}
                    </FormGroup>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      block
                      disabled={isSubmitting}
                      className="w-100 mb-3 btn btn-outline-primary"
                    >
                      {t('common.enter')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('signUpPage.noAccount')}</span>
                <a href="/signup">{t('signUpPage.register')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
