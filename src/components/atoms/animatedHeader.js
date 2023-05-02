import cx from 'classnames';

export default function AnimatedHeader({
  className,
  textOne,
  textRotate,
  textTwo,
  ...props
}) {
  const componentClassName = cx('c-animated-header', className, {});

  return (
    <h1 className={componentClassName} {...props}>
      <div>
        {textOne && <span>{textOne} </span>}
        <span className="c-animated-header--rotate"> {textRotate}</span>{' '}
      </div>
      {textTwo && <span>{textTwo}</span>}
    </h1>
  );
}
