import { Container, Row, Col, Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import avatarImage from '../assets/notFound.svg'

const ErrorPage = () => {
  const { t } = useTranslation()

  return (
    <Container className="text-center">
      <Image
        alt="Страница не найдена"
        src={avatarImage}
        fluid
        className="h-25"
      />
      <h1 className="h4 text-muted">{t('errorPage.pageNotFound')}</h1>
      <p className="text-muted">
        {t('errorPage.goTo')}
        <a href="/">
          {t('errorPage.mainPage')}
        </a>
      </p>
      <div className="Toastify"></div>
    </Container>
  )
}

export default ErrorPage
