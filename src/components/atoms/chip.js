import cx from 'classnames';
import { useState, useEffect } from 'react';

export default function Chip({
  className,
  text,
  active = false,
  onClick,
  ...props
}) {
  const [activeVar, setActiveVar] = useState(active);

  useEffect(() => {
    setActiveVar(active);
  }, [active]);

  const componentClassName = cx('c-chip', className, {
    [`c-chip--active`]: activeVar,
  });

  const handleClick = () => {
    if (onClick) {
      onClick(text);
    }

    setActiveVar(!activeVar);
  };

  return (
    <span onClick={handleClick} className={componentClassName} {...props}>
      {text}
    </span>
  );
}
