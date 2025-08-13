import cn from "classnames";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";

const RemovableChannelBtn = ({ isActive, setActiveChannelId, showModal, channel }) => {
  console.log('channel in removable_channel_btn  ', channel);

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        variant=""
        className={cn('w-100', 'rounded-0', 'text-start', 'text-truncate', { 'btn-secondary': isActive })}
        onClick={() => setActiveChannelId(channel.id)}
      >
        <span className="me-1"># </span>
        {channel.name}
      </Button>

      <Dropdown.Toggle
        split
        variant=""
        className={cn(
          'flex-grow-0',
          'dropdown-toggle-split',
          { 'btn-secondary': isActive }
        )}
      >
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="delete" href="#" role="button" tabIndex="0" onClick={() => showModal('removing', channel)}>
          Удалить
        </Dropdown.Item>
        <Dropdown.Item eventKey="rename" href="#" role="button" tabIndex="0" onClick={() => showModal('rename', channel)}>
          Переименовать
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default RemovableChannelBtn;