import { useEffect, useRef, useState, useMemo } from 'react'
import { Col, Form, Button, InputGroup } from 'react-bootstrap'
import { useGetMessagesQuery, useAddMessageMutation } from '../services/messagesApi.js'
import { selectActiveChannelId } from '../slices/channelsSlice.js'
import { useGetChannelsQuery } from '../services/channelsApi.js'
import { addMessageFromSocket, selectAll } from '../slices/messagesSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import * as io from 'socket.io-client'
import { selectAuthUser } from '../slices/authSlice.js'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import enProfanityWords from '../utils/enWords.js'

const Chat = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const allMessages = useSelector(selectAll)
  const { isLoading: isLoadingMessages } = useGetMessagesQuery()
  const idActiveChannel = useSelector(selectActiveChannelId)
  const { data: channels, isLoading: channelsLoading } = useGetChannelsQuery()
  const [newMessage, setNewMessage] = useState('')
  const [addMessage, { isLoading: isLoadingMessage }] = useAddMessageMutation()
  const currentUser = useSelector(selectAuthUser)
  const inputRef = useRef()
  const messagesEndRef = useRef()
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const host = window.location.host
  const socketURL = `${protocol}//${host}`
  let socket
  // let filteredMessages

  const filterMessages = messages => messages.filter(message => String(message.channelId) === String(idActiveChannel))
  const activeChannel = channels?.find(channel => String(channel.id) === String(idActiveChannel))
  const nameActiveChannel = activeChannel?.name || ''

  const filteredMessages = useMemo(() => filterMessages(allMessages), [allMessages, idActiveChannel])

  useEffect(() => {
    try {
      leoProfanity.loadDictionary('ru')
      leoProfanity.add(enProfanityWords)
    }
    catch (error) {
       toast.error(error)
    }

    inputRef.current.focus()

    socket = io.connect(socketURL)

    socket.on('newMessage', (payload) => {
      dispatch(addMessageFromSocket(payload))
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleChangeInput = (e) => {
    setNewMessage(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const messageText = newMessage
    if (!messageText) return

    const censoredMessage = leoProfanity.clean(messageText)

    const message = {
      body: censoredMessage,
      channelId: idActiveChannel,
      username: currentUser,
    }

    try {
      await addMessage(message).unwrap()
      setNewMessage('')
    }
    catch (err) {
       toast.error(err)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filteredMessages])

  // filteredMessages = filterMessages(allMessages)
  const countMessages = filteredMessages.length

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="mb-4 bg-light p-3 shadow-sm small">
          <p className="m-0">
            <strong>{!channelsLoading ? `# ${nameActiveChannel}` : ''}</strong>
            <br />
            <span className="text-muted">{t('chat.message', { count: countMessages })}</span>
          </p>
        </div>

        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
        >
          {isLoadingMessages
            ? (
                <span>{t('chat.loadingMessages')}</span>
              )
            : (
                filteredMessages.length > 0 && filteredMessages
                  .map(message => (
                    <div
                      key={message.id}
                      className="text-break mb-2"
                    >
                      <strong>
                        {message.username}
                        :
                      </strong>
                      {' '}
                      {message.body}
                    </div>
                  ))
              )}
          <div ref={messagesEndRef} />
        </div>

        <div className=" mt-auto px-5 py-3">
          <Form
            noValidate
            className="p-1 border rounded-2"
            onSubmit={handleSubmit}
          >
            <InputGroup className="has-validation">
              {isLoadingMessage
                ? (
                    <Form.Control
                      onChange={handleChangeInput}
                      aria-label={t('chat.newMessage')}
                      placeholder={t('chat.loadingPostMessage')}
                      name="body"
                      className="border-0 p-0 ps-2"
                      value=""
                    />
                  )
                : (
                    <Form.Control
                      onChange={handleChangeInput}
                      aria-label={t('chat.newMessage')}
                      placeholder={t('chat.enterMessage')}
                      name="body"
                      className="border-0 p-0 ps-2"
                      value={newMessage}
                      ref={inputRef}
                    />
                  )}

              <Button
                variant=""
                type="submit"
                className="btn-group-vertical"
                disabled={!newMessage.trim() || isLoadingMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-right-square"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                  />
                </svg>
                <span className="visually-hidden">{t('chat.sendMessage')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  )
}

export default Chat
