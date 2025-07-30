import { Col, Button, ListGroup, Container, NavItem } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { channelsApi, useGetChannelsQuery } from '../services/channelsApi.js';
import { countChannels } from "../slices/channelsSlice.js"
import cn from "classnames";
import { useDispatch, useSelector } from 'react-redux';

const Channels = () => {
  const { data } = useGetChannelsQuery();
  // const countChanls = useSelector(countChannels);

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
            {data && data.map((channel) => {
              const channelName = channel.name;
              return (
                <NavItem as="li" className="w-100">
                  <Button
                    type="button"
                    className='w-100 rounded-0 text-start'
                    variant=""
                  >
                    <span className="me-1"># </span>
                    {channelName}
                  </Button>
                </NavItem>
              )
            })}
          </ListGroup>
        </Col>

  );
};

export default Channels;