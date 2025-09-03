import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FloatingLabel,
  Form as BootstrapForm,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSignUpMutation } from '../services/authApi.js'
import { useNavigate } from 'react-router-dom'
import { setAuthData } from '../slices/authSlice.js'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import avatarImage from '../assets/signupImg.jpg'
import { showErrorToast } from '../utils/toastUtils.js'
import * as Yup from 'yup';

const SignupPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [signup] = useSignUpMutation()
  const navigate = useNavigate()

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('error.min3max20'))
      .max(20, t('error.min3max20'))
      .required(t('error.requiredInput')),
    password: Yup.string()
      .min(6, t('error.min6Symbols'))
      .required(t('error.requiredInput')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('error.passwordsShoudBeEqual'))
      .required(t('error.passwordsShoudBeEqual'))
  })

  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

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
    }
    catch (error) {
      setSubmitting(false)
      const errorMessage = typeof error === 'string' ? error : error?.message || 'Unknown error'

      if (
        error.status === 'FETCH_ERROR'
        || errorMessage.includes('Failed to fetch')
        || !navigator.onLine
      ) {
        showErrorToast(t('error.errorConnect'))
      }
      else if (error.status === 409) {
        setErrors({ username: '', password: '', confirmPassword: t('error.suchUserAlreadyExists') })
      }
      else {
        showErrorToast(t('error.errorRegistration'))
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
                  src={avatarImage}
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
                validationSchema={SignupSchema}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting, setFieldTouched }) => (
                  <BootstrapForm
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
                          <BootstrapForm.Control
                            {...field}
                            type="text"
                            placeholder={t('error.min3max20')}
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
                          <BootstrapForm.Control
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
                          <BootstrapForm.Control
                            {...field}
                            type="password"
                            ref={confirmPasswordRef}
                            placeholder={t('error.passwordsShoudBeEqual')}
                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                            onKeyDown={(e) => {
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
                  </BootstrapForm>
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
