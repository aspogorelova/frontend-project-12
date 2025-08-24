import { ErrorMessage, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useGetChannelsQuery, useUpdateChannelMutation } from '../services/channelsApi'
import { Modal, Form, Button, CloseButton } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const RenameChannelModal = ({ modalInfo, onHide }) => {
  const {t} = useTranslation()
  const [updateChannel] = useUpdateChannelMutation()
  const { data: channelsBeforeAdd } = useGetChannelsQuery()

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
    const newName = {
      name: channel.name,
    }

    try {
      await updateChannel({ id: modalInfo.item.id, body: newName }).unwrap()

      toast.success(t('channels.renamedChannel'), {
        icon: (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#4CAF50">
            <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z" />
          </svg>
        ),
        className: 'Toastify__toast--success',
        progressClassName: 'Toastify__progress-bar--success',
      })

      resetForm()
      onHide()
    } catch (error) {
      console.log(t('error.errorSendNewChannel'), error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
        <CloseButton aria-label="Close" className="btn" data-bs-dismiss="modal" onClick={onHide} />
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
                <Form.Label className="visually-hidden" htmlFor="name">{t('channels.nameChannel')}</Form.Label>
                <Field id="name" name="name" className="mb-2" as={Form.Control} autoFocus />
                <ErrorMessage component="div" className="invalid-feedback d-block" name="name" />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="secondary btn me-2" onClick={onHide} disabled={isSubmitting}>{t('common.cancel')}</Button>
                <Button type="submit" variant="primary btn" disabled={isSubmitting}>{t('common.send')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default RenameChannelModal
