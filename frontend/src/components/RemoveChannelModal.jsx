import { Modal, Button, CloseButton } from 'react-bootstrap'
import { useRemoveChannelMutation } from '../services/channelsApi.js'
import { useDispatch } from 'react-redux'
import { setActiveChannel } from '../slices/channelsSlice.js'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { showSuccessToast } from '../utils/toastUtils.js'

const RemoveChannelModal = ({ modalInfo, onHide }) => {
  const { t } = useTranslation()
  const [removeChannel] = useRemoveChannelMutation()
  const dispatch = useDispatch()
  const defaultActiveChannel = 1
  const activeChannelId = localStorage.getItem('currentChannel')

  const handleRemove = async () => {
    try {
      await removeChannel(modalInfo.item.id).unwrap()
      showSuccessToast(t('channels.channelRemoved'))

      if (modalInfo.item.id === activeChannelId) {
        dispatch(setActiveChannel(defaultActiveChannel))
      }

      onHide()
    }
    catch (error) {
      toast.error(error)
    }
  }

  return (
    <Modal
      show
      centered
      onHide={onHide}
    >
      <Modal.Header>
        <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
        <CloseButton
          aria-label="Close"
          className="btn"
          data-bs-dismiss="modal"
          onClick={onHide}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('common.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            variant="secondary btn me-2"
            onClick={onHide}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="button"
            variant="danger btn"
            onClick={handleRemove}
          >
            {t('common.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal
