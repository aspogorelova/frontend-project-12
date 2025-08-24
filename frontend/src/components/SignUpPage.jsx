import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FloatingLabel,
  Form as BForm,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSignUpMutation } from '../services/authApi.js'
import { useNavigate } from 'react-router-dom'
import { setAuthData } from '../slices/authSlice.js'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useRef } from 'react'

const SignupPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [signup] = useSignUpMutation()
  const navigate = useNavigate()

  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const validate = values => {
    const errors = {}

    if (!values.username) {
      errors.username = t('error.requiredInput')
    } else if (values.username.length < 3 || values.username.length > 20) {
      errors.username = t('error.min3max20')
    }

    if (!values.password) {
      errors.password = t('error.requiredInput')
    } else if (values.password.length < 6) {
      errors.password = t('error.min6Symbols')
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = t('error.passwordsShoudBeEqual')
    } else if (!values.confirmPassword) {
      errors.confirmPassword = t('error.passwordsShoudBeEqual')
    }

    return errors
  }

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const newUser = {
        username: values.username,
        password: values.password,
      }

      const response = await signup(newUser).unwrap()

      dispatch(setAuthData({
        username: values.username,
        token: response.token,
      }))

      navigate('/')
    } catch (error) {
      setSubmitting(false)
      const errorMessage = typeof error === 'string' ? error : error?.message || 'Unknown error'

      if (
        error.status === 'FETCH_ERROR'
        || errorMessage.includes('Failed to fetch')
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
      } else if (error.status === 409) {
        setErrors({ username: '', password: '', confirmPassword: t('error.suchUserAlreadyExists') })
      } else {
        toast.error(t('error.errorRegistration'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        })
      }
    }
  }

  const handleEnterPress = (fieldName, nextFieldRef, event, setFieldTouched) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setFieldTouched(fieldName, true, true)

      if (nextFieldRef) {
        nextFieldRef.current.focus()
      }
    }
  }

  return (
    <Container
      fluid
      className="h-100"
    >
      <Row className="justify-content-center align-content-center h-100">
        <Col
          xs={12}
          md={8}
          xxl={6}
        >
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src="./signupImg.jpg"
                  className="rounded-circle"
                  alt={t('signupPage.register')}
                />
              </div>

              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting, setFieldTouched }) => (
                  <BForm
                    as={Form}
                    className="w-50"
                  >
                    <h1 className="text-center mb-4">{t('signUpPage.register')}</h1>

                    <Field name="username">
                      {({ field }) => (
                        <FloatingLabel
                          controlId="username"
                          label={t('logInPage.nameUser')}
                          className="mb-3"
                        >
                          <BForm.Control
                            {...field}
                            type="text"
                            placeholder={t('error.min3max20')}
                            autoComplete="username"
                            isInvalid={touched.username && !!errors.username}
                            onKeyDown={e => handleEnterPress('username', passwordRef, e, setFieldTouched)}
                          />
                          <ErrorMessage name="username">
                            {err => (
                              <div className="invalid-tooltip">{err}</div>
                            )}
                          </ErrorMessage>
                        </FloatingLabel>
                      )}
                    </Field>

                    <Field name="password">
                      {({ field }) => (
                        <FloatingLabel
                          controlId="password"
                          label={t('signUpPage.password')}
                          className="mb-3"
                        >
                          <BForm.Control
                            {...field}
                            type="password"
                            ref={passwordRef}
                            placeholder={t('error.min6Symbols')}
                            isInvalid={touched.password && !!errors.password}
                            onKeyDown={e => handleEnterPress('password', confirmPasswordRef, e, setFieldTouched)}
                          />
                          <ErrorMessage name="password">
                            {err => (
                              <div className="invalid-tooltip">{err}</div>
                            )}
                          </ErrorMessage>
                        </FloatingLabel>
                      )}
                    </Field>

                    <Field name="confirmPassword">
                      {({ field }) => (
                        <FloatingLabel
                          controlId="confirmPassword"
                          label={t('logInPage.confirmPassword')}
                          className="mb-4"
                        >
                          <BForm.Control
                            {...field}
                            type="password"
                            ref={confirmPasswordRef}
                            placeholder={t('error.passwordsShoudBeEqual')}
                            autoComplete="new-password"
                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                setFieldTouched('confirmPassword', true, true)
                              }
                            }}
                          />
                          <ErrorMessage name="confirmPassword">
                            {msg => (
                              <div className="invalid-tooltip">
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </FloatingLabel>
                      )}
                    </Field>

                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-100"
                      disabled={isSubmitting}
                    >
                      {t('logInPage.registrate')}
                    </Button>
                  </BForm>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupPage
