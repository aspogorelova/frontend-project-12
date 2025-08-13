import { Modal, Button, CloseButton } from "react-bootstrap";
import { useRemoveChannelMutation } from "../services/channelsApi.js";
import { useDispatch } from "react-redux";
import { setActiveChannel } from "../slices/channelsSlice.js";

const RemoveChannelModal = ({ modalInfo, onHide }) => {
  const [removeChannel] = useRemoveChannelMutation();
  const dispatch = useDispatch();
  const defaultActiveChannel = 1;
  const activeChannelId = localStorage.getItem('currentChannel');

  const handleRemove = async () => {
    console.log('remove channel');
    try {
      await removeChannel(modalInfo.item.id).unwrap();

      if (modalInfo.item.id === activeChannelId) {
        dispatch(setActiveChannel(defaultActiveChannel))
      }

      onHide();
    } catch (error) {
      console.log(`Ошибка удаления канала: ${error}`);
    }
  }

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Удалить канал</Modal.Title>
        <CloseButton aria-label="Close" className='btn' data-bs-dismiss='modal' onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button type='button' variant="secondary btn me-2" onClick={onHide}>Отменить</Button>
          <Button type="button" variant="danger btn" onClick={handleRemove}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal;