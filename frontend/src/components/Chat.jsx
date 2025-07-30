import { Col, Form, Button, InputGroup } from 'react-bootstrap';
import '../styles.css';
import { useGetMessagesQuery } from '../services/messagesApi.js';
import selectAllChannels from '../slices/channelsSlice.js';
import { useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../services/channelsApi';
import { countMessages } from '../slices/messagesSlice.js';

const Chat = () => {
    const { data: mess } = useGetMessagesQuery();
    const { data: listChannels } = useGetChannelsQuery();
    const messages = mess;
    const channels = listChannels;
    const countMess = useSelector(countMessages);
    // console.log('count messages  ', countMess);
    

  return (
    <Col className="p-0 h-100">
      <div className='d-flex flex-column h-100'>
        <div className="mb-4 bg-light p-3 shadow-sm small">
          <p className='m-0'>
            <strong># general</strong>
            <br />
            <span className="text-muted">{countMess} сообщений</span>
          </p>
        </div>

        {/* Messages box */}
        <div id="messages-box" className="chat-messages overflow-auto px-5"></div>

        {/* Message input section */}
        <div className=" mt-auto px-5 py-3">
          <Form noValidate className='p-1 border rounded-2'>
          <InputGroup className="has-validation">
            <Form.Control
              aria-label='Новое сообщение'
              placeholder="Введите сообщение..."
              name="body"
              className="border-0 p-0 ps-2"
              value=''
            />

            <Button variant="" type="submit" className='btn-group-vertical' disabled>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
              <span className="visually-hidden">Отправить</span>
            </Button>
          </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Chat;