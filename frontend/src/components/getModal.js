import AddChannelModal from "./AddChannelModal.jsx";

const modals = {
    adding: AddChannelModal,
}

const getModal = (type) => modals[type];

export default getModal;