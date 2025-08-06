import { Col, Button, ListGroup, Container, NavItem } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useGetChannelsQuery } from '../services/channelsApi.js';
import { setActiveChannel } from "../slices/channelsSlice.js"
import cn from "classnames";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ChannelBtn = ({ channel, isActive, onClick }) => {
  const classes = cn('w-100', 'rounded-0', 'text-start', { 'btn-secondary': isActive });

  return (
    <NavItem as="li" className="w-100">
      <Button
        type="button"
        className={classes}
        variant=""
        onClick={() => onClick(channel.id)}
      >
        <span className="me-1"># </span>
        {channel.name}
      </Button>
    </NavItem>
  )
}

const Channels = () => {
  const dispatch = useDispatch();
  const { data } = useGetChannelsQuery();
  const activeChannelDefault = 1;
  const [activeChannelId, setActiveChannelId] = useState(activeChannelDefault);

  useEffect(() => {
    dispatch(setActiveChannel(activeChannelId));
  }, [activeChannelId])

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <strong>Каналы</strong>
        <Button type='button' className="btn-group-vertical p-0 ms-auto text-primary" variant="">
          <PlusSquare size={20} />
          <span className='visually-hidden'>+</span>
        </Button>
      </Container>
      <ListGroup as="ul" id='channels-box' className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" variant="">
        {data && data.map((channel) => (
          <ChannelBtn
            key={channel.id}
            channel={channel}
            isActive={String(channel.id) === String(activeChannelId)}
            onClick={(id) => setActiveChannelId(id)}
          />
        ))}
      </ListGroup>
    </Col>

  );
};

export default Channels;