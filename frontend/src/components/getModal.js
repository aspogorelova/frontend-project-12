import AddChannelModal from './AddChannelModal.jsx'
import RemoveChannelModal from './RemoveChannelModal.jsx'
import RenameChannelModal from './RenameChannelModal.jsx'

const modals = {
  adding: AddChannelModal,
  removing: RemoveChannelModal,
  rename: RenameChannelModal,
}

const getModal = type => modals[type]

export default getModal
