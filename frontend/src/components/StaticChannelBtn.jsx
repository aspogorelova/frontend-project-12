import cn from 'classnames'
import { NavItem, Button } from 'react-bootstrap'

const StaticChannelBtn = ({ channel, isActive, setActiveChannelId }) => {
  const classes = cn('w-100', 'rounded-0', 'text-start', { 'btn-secondary': isActive })

  return (
    <NavItem
      as="li"
      className="w-100"
    >
      <Button
        type="button"
        className={classes}
        variant=""
        onClick={() => setActiveChannelId(channel.id)}
      >
        <span className="me-1"># </span>
        {channel.name}
      </Button>
    </NavItem>
  )
}

export default StaticChannelBtn
