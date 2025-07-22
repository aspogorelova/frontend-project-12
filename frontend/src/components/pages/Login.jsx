import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Fragment } from 'react';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Заполните это поле'),
  password: Yup.string().required('Заполните это поле'),
})

const Login = () => {
  return (
    <Fragment>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">Hexlet Chat</a>
            <button type="button" className="btn btn-primary">Выйти</button>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="../../assets/avatarAvtor.jpg" className="rounded-circle" alt="Войти"></img>
                  </div>
                  <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        // Логика запроса на сервер
                        setSubmitting(false);
                      }, 400)
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form class='col-12 col-md-6 mt-3 mt-md-0'>
                        <h1 className="text-center mb-4">Войти</h1>
                        <div className="form-floating mb-3">
                          <label htmlFor="username">Ваш ник</label>
                          <Field type='text' name='username' autocomplete='username' required placeholder='Ваш ник' id='username' className='form-control' />
                          <ErrorMessage name='username' component='div' className='error' />
                        </div>
                        <div className="form-floating mb-4">
                          <label htmlFor="password">Пароль</label>
                          <Field type='password' name='password' autocomplete='current-password' required placeholder='Пароль' className="form-control" id='password' />
                          <ErrorMessage name='password' component='div' className='error' />
                        </div>
                        <button type='submit' className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting}>Войти</button>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>Нет аккаунта?</span>
                    <a href="/signup">Регистрация</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
    </Fragment>
  )
}

export default Login;
