import * as React from 'react';
import cx from 'classnames';
import Icon from '../atoms/icon';

export default function Modal({
  className,
  label,
  value,
  subLabel,
  ...props
}) {
  const componentClassName = cx('c-modal', className, {})

  const [toggleModal, setToggleModal] = React.useState(false);

  
  return (
    <div
      className={componentClassName}

      {...props}
    >
      <h3
        className="c-modal__heading"
        onClick={() => setToggleModal(!toggleModal)}
      >
        {label}
      </h3>
      <h4>{subLabel}</h4>
      {toggleModal &&
        <div className="c-modal__box">
          <span
            className="c-modal__close"
            onClick={() => setToggleModal(false)}
            aria-label="Close"
          >
              <Icon iconName="plus" width="32" height="32"/>
          </span>
          {value}
        </div>
      }
    </div>
  )
}