import { ErrorMessage, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useGetChannelsQuery, useUpdateChannelMutation } from '../services/channelsApi'
import { Modal, Form, Button, CloseButton } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import enProfanityWords from '../utils/enWords.js'
import { useEffect } from 'react'
import { showSuccessToast } from '../utils/toastUtils.js'

const RenameChannelModal = ({ modalInfo, onHide }) => {
  const { t } = useTranslation()
  const [updateChannel] = useUpdateChannelMutation()
  const { data: channelsBeforeAdd } = useGetChannelsQuery()

  useEffect(() => {
    try {
      leoProfanity.loadDictionary('ru')
      leoProfanity.add(enProfanityWords)
    }
    catch (error) {
      toast.error(error)
    }
  }, [t])

  const checkUniqueName = (value) => {
    return !channelsBeforeAdd?.some(channel => channel.name === value)
  }

  const validationNewNameSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('error.requiredInput'))
      .min(3, t('error.min3max20'))
      .max(20, t('error.min3max20'))
      .test('unique', t('error.unique'), checkUniqueName),
  })

  const handleSubmit = async (channel, { setSubmitting, resetForm }) => {
    const censoredName = leoProfanity.clean(channel.name)
    const newName = {
      name: censoredName,
    }

    try {
      await updateChannel({ id: modalInfo.item.id, body: newName }).unwrap()
      showSuccessToast(t('channels.renamedChannel'))
      resetForm()
      onHide()
    }
    catch (error) {
      toast.error(error)
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      show
      centered
      onHide={onHide}
    >
      <Modal.Header>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
        <CloseButton
          aria-label="Close"
          className="btn"
          data-bs-dismiss="modal"
          onClick={onHide}
        />
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationNewNameSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label
                  className="visually-hidden"
                  htmlFor="name"
                >
                  {t('channels.nameChannel')}
                </Form.Label>
                <Field
                  id="name"
                  name="name"
                  className="mb-2"
                  as={Form.Control}
                  autoFocus
                />
                <ErrorMessage
                  component="div"
                  className="invalid-feedback d-block"
                  name="name"
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary btn me-2"
                  onClick={onHide}
                  disabled={isSubmitting}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="primary btn"
                  disabled={isSubmitting}
                >
                  {t('common.send')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default RenameChannelModal
