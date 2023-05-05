import * as React from 'react';
import cx from 'classnames';

export default function ToolTip({
  className,
  label,
  value,
  ...props
}) {
  const componentClassName = cx('c-tooltip', className, {})

  const [hovering, setHovering] = React.useState(false);

  
  return (
    <span
      className={componentClassName}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      {...props}
    >
      {label}
      {hovering && <span className="c-tooltip__box">{value}</span>}
    </span>
  )
}