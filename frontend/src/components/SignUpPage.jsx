import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FloatingLabel,
  Form as BForm
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authApi.js';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { setAuthData } from '../slices/authSlice.js';

// Схема валидации
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 симоволов')
    .max(20, 'От 3 до 20 симоволов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Подтвердите пароль')
});

const SignupPage = () => {
  const dispatch = useDispatch();
  const [signup] = useSignUpMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const newUser = {
        username: values.username,
        password: values.password,
      }

      const response = await signup(newUser).unwrap();

      dispatch(setAuthData({
        username: values.username,
        token: response.token
      }));

      navigate('/');

    } catch (error) {
      setSubmitting(false);
       if (error.status === 409) {
        setErrors({ username: error, password: error, confirmPassword: 'Такой пользователь уже существует' });
      } else {
        setErrors({ username: error, password: error, confirmPassword: 'Ошибка регистрации' });
      }
    }
  }

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src="./signupImg.jpg"
                  className="rounded-circle"
                  alt="Регистрация"
                />
              </div>

              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={SignupSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <BForm as={Form} className="w-50">
                    <h1 className="text-center mb-4">Регистрация</h1>

                    {/* Поле имени пользователя */}
                    <Field name="username">
                      {({ field }) => (
                        <FloatingLabel
                          controlId="username"
                          label="Имя пользователя"
                          className="mb-3"
                        >
                          <BForm.Control
                            {...field}
                            type="text"
                            placeholder="От 3 до 20 символов"
                            autoComplete="username"
                            isInvalid={touched.username && !!errors.username}
                          />
                          <ErrorMessage name="username">
                            {() => (
                              <div className="invalid-tooltip" />
                            )}
                          </ErrorMessage>
                        </FloatingLabel>
                      )}
                    </Field>

                    <Field name="password">
                      {({ field }) => (
                        <FloatingLabel
                          controlId="password"
                          label="Пароль"
                          className="mb-3"
                        >
                          <BForm.Control
                            {...field}
                            type="password"
                            placeholder="Не менее 6 символов"
                            isInvalid={touched.password && !!errors.password}
                          />
                          <ErrorMessage name="password">
                              {() => (
                              <div className="invalid-tooltip" />
                            )}
                          </ErrorMessage>
                        </FloatingLabel>
                      )}
                    </Field>

                    {/* Подтверждение пароля */}
                    <Field name="confirmPassword">
                      {({ field }) => (
                        <FloatingLabel
                          controlId="confirmPassword"
                          label="Подтвердите пароль"
                          className="mb-4"
                        >
                          <BForm.Control
                            {...field}
                            type="password"
                            placeholder="Пароли должны совпадать"
                            autoComplete="new-password"
                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
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
                      Зарегистрироваться
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
};

export default SignupPage;