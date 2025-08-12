import { ErrorMessage, Formik, Field } from "formik";
import * as Yup from 'yup';
import { setActiveChannel } from "../slices/channelsSlice";
import { useDispatch } from "react-redux";
import { useGetChannelsQuery, useAddChannelMutation } from "../services/channelsApi";
import { Modal, Form, Button, CloseButton } from "react-bootstrap";

const AddChannelModal = ({ modalInfo, onHide }) => {
  const [addChannel] = useAddChannelMutation();
  const { data: channelsBeforeAdd } = useGetChannelsQuery();
  const dispatch = useDispatch();

  const checkUniqueName = (value) => {
    return !channelsBeforeAdd?.some(channel => channel.name === value);
  }

  const validationNewChannelSchema = Yup.object().shape({
    name: Yup.string()
      .required("Обязательное поле")
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .test('unique', 'Должно быть уникальным', checkUniqueName),
  });

  const handleSubmit = async (channel, { setSubmitting, resetForm }) => {
    const newChannel = {
      name: channel.name,
      removable: true,
    }

    try {
      const { id } = await addChannel(newChannel).unwrap();
      dispatch(setActiveChannel(id));
      resetForm();
      onHide();
    } catch (error) {
      console.log('Ошибка отравки нового канала на сервер:  ', error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <CloseButton aria-label="Close" className='btn' data-bs-dismiss='modal' onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationNewChannelSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
                <Field id='name' name="name" className="mb-2" as={Form.Control} autoFocus />
                <ErrorMessage component="div" className="invalid-feedback d-block" name="name" />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="secondary btn me-2" onClick={onHide} disabled={isSubmitting}>Отменить</Button>
                <Button type="submit" variant="primary btn" disabled={isSubmitting}>Отправить</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default AddChannelModal;