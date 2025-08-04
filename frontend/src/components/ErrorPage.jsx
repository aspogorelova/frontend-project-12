import { Container, Row, Col, Image } from 'react-bootstrap';

const ErrorPage = () => {
  return (
    <Container fluid className="h-100" id="chat">
      <Row className="h-100">
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <Image
            alt="Страница не найдена"
            src="./notFound.svg"
            fluid
            className="h-25"
          />
          <h1 className="h4 text-muted">Страница не найдена</h1>
          <p className="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p>
        </Col>
      </Row>
      <div className="Toastify"></div>
    </Container>
  );
};

export default ErrorPage;