import { useRef, useState } from 'react';

import cx from 'classnames';

export default function Checkbox({
  ref,
  className,
  label,
  name,
  value,
  checked,
  onChange,
  ...props
}) {
  const [isChecked, setIsChecked] = useState(checked);

  const componentClassName = cx('c-checkbox', className, {
    [`c-checkbox--checked`]: isChecked === true,
  });

  const handleCheckboxChange = (event) => {
    if (onChange) {
      onChange(event);
    }

    setIsChecked(!isChecked);
  };

  return (
    <label className={componentClassName}>
      <input
        type="checkbox"
        className="c-checkbox__input"
        checked={isChecked}
        onChange={handleCheckboxChange}
        value={value}
        ref={ref}
        name={name}
      />
      <span className="c-checkbox__custom-check"></span>
    </label>
  );
}
