import { Modal, Button, CloseButton } from "react-bootstrap";
import { useRemoveChannelMutation } from "../services/channelsApi.js";
import { useDispatch } from "react-redux";
import { setActiveChannel } from "../slices/channelsSlice.js";
import { toast } from 'react-toastify';

const RemoveChannelModal = ({ modalInfo, onHide }) => {
  const [removeChannel] = useRemoveChannelMutation();
  const dispatch = useDispatch();
  const defaultActiveChannel = 1;
  const activeChannelId = localStorage.getItem('currentChannel');

  const handleRemove = async () => {
    console.log('remove channel');
    try {
      await removeChannel(modalInfo.item.id).unwrap();

      toast.success('Канал удалён', {
        icon: (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#4CAF50">
            <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"/>
          </svg>
        ),
        className: 'Toastify__toast--success',
        progressClassName: 'Toastify__progress-bar--success',
      });

      if (modalInfo.item.id === activeChannelId) {
        dispatch(setActiveChannel(defaultActiveChannel))
      }

      onHide();
    } catch (error) {
      console.log(`Ошибка удаления канала: ${error}`);
      toast.error('Ошибка удаления канала');
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