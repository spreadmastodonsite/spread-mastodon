import { useState, useEffect } from 'react';
import cx from 'classnames';

export default function AnimatedHeader({
  className,
  textOne,
  textRotate,
  textTwo,
  ...props
}) {
  const [rotateIndex, setRotateIndex] = useState(0);

  const componentClassName = cx('c-animated-header', className, {});

  useEffect(() => {
    const interval = setInterval(() => {
      setRotateIndex((index) => (index + 1) % textRotate.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={componentClassName}>
      <div>
        {textOne && <span>{textOne} </span>}
        <span className="c-animated-header--rotate">
          {' '}
          {textRotate[rotateIndex]}
        </span>{' '}
      </div>
      {textTwo && <span>{textTwo}</span>}
    </h1>
  );
}
