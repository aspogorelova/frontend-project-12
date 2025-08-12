import cn from "classnames";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";

const RemovableChannelBtn = ({ channel, isActive, setActiveChannelId }) => {

  return (
    <ButtonGroup className="d-flex">
      <Button
        variant=""
        className={cn('w-100', 'rounded-0', 'text-start', 'text-truncate', { 'btn-secondary': isActive })}
        onClick={() => setActiveChannelId(channel.id)}
      >
        <span className="me-1">#</span> {channel.name}
      </Button>
      <Button variant="" className={cn('flex-grow-0', 'dropdown-toggle', 'dropdown-toggle-split', { 'btn-secondary': isActive })}>
        <span className="visually-hidden">Управление каналом</span>
      </Button>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant=""
          aria-labelledby="react-aria789130751-:r1:"
          className="dropdown-menu"
        />
        <Dropdown.Menu>
          <Dropdown.Item eventKey="delete" href="#" role="button" tabIndex="0">
            Удалить
          </Dropdown.Item>
          <Dropdown.Item eventKey="rename" href="#" role="button" tabIndex="0">
            Переименовать
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  )
}

export default RemovableChannelBtn;