import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthFailed, selectAuthError, setAuthData } from '../slices/authSlice.js';
import { useLoginMutation } from '../services/authApi.js';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Card, Image, Button, FormControl, FormGroup, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Заполните это поле'),
  password: Yup.string().required('Заполните это поле'),
})

const LoginPage = () => {
  const location = useLocation();
  const previousePath = location.state?.from || '/';
  const navigator = useNavigate();
  const errorMessage = useSelector(selectAuthError);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  
  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const handleSubmit = async (values) => {
    try {
      const response = await login(values).unwrap();
      const token = response.token;
      localStorage.setItem('jwttoken', token);
      localStorage.setItem('username', values.username);

      dispatch(setAuthData({
        user: values.username,
        token: token,
      }));

      navigator(previousePath);

    } catch (error) {
      dispatch(setAuthFailed('Неверные имя пользователя или пароль'));
    };
  };

  return (
    <Container fluid className='h-100'>
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src='./avatarAvtor.jpg' roundedCircle alt="Войти" />
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
                    <h1 className="text-center mb-4">Войти</h1>
                    <FormGroup controlId="username" className="form-floating mb-3">
                      <Field ref={inputRef} type="text" name="username" autocomplete="username" required placeholder="Ваш ник" as={FormControl} />
                      <label htmlFor='username'>Ваш ник</label>
                    </FormGroup>
                    <FormGroup controlId="password" className="form-floating mb-4">
                      <Field type="password" name="password" autocomplete="current-password" required placeholder="Пароль" as={FormControl} />
                      <label htmlFor='password'>Пароль</label>
                      {errorMessage && (
                        <div className='invalid-tooltip'>{errorMessage}</div>
                      )}
                    </FormGroup>
                    <Button type="submit" variant="outline-primary" block disabled={isSubmitting} className='w-100 mb-3 btn btn-outline-primary'>
                      Войти
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <a href="/signup"> Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage;
