import { Container, Row, Col, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

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
          <h1 className="h4 text-muted">{t('errorPage.pageNotFound')}</h1>
          <p className="text-muted">{t('errorPage.goTo')}<a href="/">{t('errorPage.mainPage')}</a></p>
        </Col>
      </Row>
      <div className="Toastify"></div>
    </Container>
  );
};

export default ErrorPage;