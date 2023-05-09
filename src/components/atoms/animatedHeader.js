import cx from 'classnames';

export default function AnimatedHeader({
  className,
  textOne,
  textRotate,
  textTwo,
  rotateLocation = 'after',
  ...props
}) {
  const componentClassName = cx('c-animated-header', className, {
    'c-animated-header--rotate-newline': rotateLocation === 'newline',
    'c-animated-header--rotate-before': rotateLocation === 'before',
    'c-animated-header--rotate-after': rotateLocation === 'after',
    'c-animated-header--all-rows': textOne && textTwo,
  });

  const content = (
    <>
      {rotateLocation === 'after' || rotateLocation === 'newline' ? (
        <span className="c-animated-header__text-one">{textOne} </span>
      ) : (
        ''
      )}
      {textRotate.map((text) => {
        return (
          <span key={text} className="c-animated-header--rotate">
            {' '}
            {text}
          </span>
        );
      })}
      {rotateLocation === 'before' && (
        <span className="c-animated-header__text-one">{textOne} </span>
      )}
    </>
  );

  return (
    <h1 className={componentClassName} {...props}>
      <div className="c-animated-header--content">{content}</div>
      {textTwo && (
        <span className="c-animated-header__text-two">{textTwo}</span>
      )}
    </h1>
  );
}
