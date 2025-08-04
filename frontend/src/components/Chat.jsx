import i18next from 'i18next';
import resources from '../locales/index.js';
import { useEffect, useRef, useState } from 'react';
import { Col, Form, Button, InputGroup } from 'react-bootstrap';
import '../styles.css';
import { useGetMessagesQuery, useAddMessageMutation } from '../services/messagesApi.js';
import { selectActiveChannelId } from '../slices/channelsSlice.js';
import { useSelector } from 'react-redux';
import * as io from 'socket.io-client';

// Слово сообщения должно меняться по падежам
// Добавить сообщение о загрузке сообщений

const Chat = () => {
  const i18nextInstance = i18next.createInstance()
  const runApp = async () => {
    await i18nextInstance.init({
      lng: 'ru',
      debug: false,
      resources,
    })
  }
  runApp();

  const { data: messages } = useGetMessagesQuery();
  const [newMessage, setNewMessage] = useState('');
  const [currentMessages, setCurrentMessages] = useState(messages || []);
  const [countMessages, setCountMessages] = useState(currentMessages.length);
  const idActiceChannel = useSelector(selectActiveChannelId);
  const [addMessage] = useAddMessageMutation();
  const currentUser = localStorage.getItem('username');
  const inputRef = useRef();
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;
  const socketURL = `${protocol}//${host}`;
  let socket;

  useEffect(() => {
    inputRef.current.focus();

    socket = io.connect(socketURL);

    socket.on('newMessage', (payload) => {
      if (payload.channelId === idActiceChannel) {
        setCurrentMessages(prevMessages => [...prevMessages, payload]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [])

  useEffect(() => {
    if (messages) {
      setCurrentMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (messages) {
      setCountMessages(currentMessages.length);
    }
  }, [currentMessages]);

  const handleChangeInput = (e) => {
    setNewMessage(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageText = newMessage;
    const message = {
      body: messageText,
      channelId: idActiceChannel,
      username: currentUser,
    }

    try {
      await addMessage(message).unwrap();
      setNewMessage('');
    } catch (err) {
      console.error("Ошибка при отправке:", err);
    }

  }

  return (
    <Col className="p-0 h-100">
      <div className='d-flex flex-column h-100'>
        <div className="mb-4 bg-light p-3 shadow-sm small">
          <p className='m-0'>
            <strong># general</strong>
            <br />
            <span className="text-muted">{i18nextInstance.t('message', { count: countMessages })}</span>
          </p>
        </div>

        {/* Messages box */}
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessages && currentMessages
            .filter((message) => message.channelId === idActiceChannel)
            .map((message) => (
              <div
                key={message.id}
                className="text-break mb-2"
              >
                <strong>{message.username}:</strong> {message.body}
              </div>
            ))
          }
        </div>

        {/* Message input section */}
        <div className=" mt-auto px-5 py-3">
          <Form noValidate className='p-1 border rounded-2' onSubmit={handleSubmit}>
            <InputGroup className="has-validation">
              <Form.Control
                onChange={handleChangeInput}
                aria-label='Новое сообщение'
                placeholder="Введите сообщение..."
                name="body"
                className="border-0 p-0 ps-2"
                value={newMessage}
                ref={inputRef}
              />

              <Button variant="" type="submit" className='btn-group-vertical' disabled={!newMessage.trim()}>
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