import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik';
import { Row, Col, Card, Image, Button, FormControl, FormGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks';
import routes from '../../routes';
import '../../styles.css';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Заполните это поле'),
  password: Yup.string().required('Заполните это поле'),
})

const LoginPage = () => {
  const inputRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();
  const location = useLocation();
  const previousePath = location.state?.from || '/';
  const navigator = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const handleSubmit = async (values) => {
    try {
      const path = routes.loginPagePath()
      const response = await axios.post(path, values);
      console.log('RESPONSE  ', response);
      const token = response.data.token;
      console.log('TOKEN  ', response.data.token);
      localStorage.setItem('userId', JSON.stringify({ token }));
      auth.logIn();
      console.log('LOG');
      navigator(previousePath);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Неверные имя пользователя или пароль');
      console.error();
    };
  };

  return (
    <Row className="h-100 justify-content-center align-items-center">
      <Col xs={12} md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
              <Image src='../../src/assets/avatarAvtor.jpg' roundedCircle alt="Войти" />
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
  )
}

export default LoginPage;
