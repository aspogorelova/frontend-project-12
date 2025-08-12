import AddChannelModal from "./AddChannelModal.jsx";
import RemoveChannelModal from "./RemoveChannelModal.jsx";

const modals = {
    adding: AddChannelModal,
    removing: RemoveChannelModal,
}

const getModal = (type) => modals[type];

export default getModal;