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
        {console.log(textRotate)}
        {textRotate.map(text => {
          return ( 
            <span key={text} className="c-animated-header--rotate"> {text}</span>
          )
        })}
        {' '}
      </div>
      {textTwo && <span>{textTwo}</span>}
    </h1>
  );
}
