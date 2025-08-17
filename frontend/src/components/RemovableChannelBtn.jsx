import cn from "classnames";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const RemovableChannelBtn = ({ isActive, setActiveChannelId, showModal, channel }) => {
  const { t } = useTranslation();

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
        <span className="visually-hidden">{t('channels.manageChannel')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="delete" href="#" role="button" tabIndex="0" onClick={() => showModal('removing', channel)}>
          {t('common.remove')}
        </Dropdown.Item>
        <Dropdown.Item eventKey="rename" href="#" role="button" tabIndex="0" onClick={() => showModal('rename', channel)}>
          {t('common.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default RemovableChannelBtn;