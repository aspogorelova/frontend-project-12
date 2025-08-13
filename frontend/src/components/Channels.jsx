import { Col, Button, ListGroup, Container } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useGetChannelsQuery } from '../services/channelsApi.js';
import { setActiveChannel, selectActiveChannelId } from "../slices/channelsSlice.js"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import StaticChannelBtn from './StaticChannelBtn.jsx';
import RemovableChannelBtn from './RemovableChannelBtn.jsx';

const renderChannelBtn = ({ channel, activeChannelId, setActiveChannelId, showModal }) => {
  const isActive = String(channel.id) === String(activeChannelId);
  return (
    channel.removable === false ?
    StaticChannelBtn({ channel, isActive, setActiveChannelId }) :
    RemovableChannelBtn({ channel, isActive, setActiveChannelId, showModal })
  )
}

const Channels = ({ showModal }) => {
  const dispatch = useDispatch();
  const { data } = useGetChannelsQuery();
  const activeChannelFromState = useSelector(selectActiveChannelId);
  localStorage.setItem('currentChannel', activeChannelFromState);
  const activeChannelId = localStorage.getItem('currentChannel');

  useEffect(() => {
    dispatch(setActiveChannel(activeChannelId));
  }, [activeChannelId])

  const setActiveChannelId = (id) => {
    dispatch(setActiveChannel(id));
  }

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <strong>Каналы</strong>
        <Button type='button' className="btn-group-vertical p-0 ms-auto text-primary" variant="" onClick={() => showModal('adding')}>
          <PlusSquare size={20} />
          <span className='visually-hidden'>+</span>
        </Button>
      </Container>
      <ListGroup as="ul" id='channels-box' className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" variant="">
        {data && data.map((channel) => renderChannelBtn({ channel, activeChannelId, setActiveChannelId, showModal }))}
      </ListGroup>
    </Col>

  );
};

export default Channels;