import * as React from 'react';
import cx from 'classnames';
import Icon from '../atoms/icon';

export default function ToolTip({
  className,
  label,
  value,
  iconWidth,
  iconHeight,
  ...props
}) {
  const componentClassName = cx('c-tooltip', className, {});

  const [hovering, setHovering] = React.useState(false);

  return (
    <span
      className={componentClassName}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      {...props}>
      <span className="c-tooltip__label">{label}</span>
      <Icon
        className="c-tooltip__icon"
        iconName="info"
        width={iconWidth}
        height={iconHeight}
      />
      {hovering && <span className="c-tooltip__box">{value}</span>}
    </span>
  );
}
