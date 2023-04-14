import cx from 'classnames';
import Link from 'next/link';

export default function Button({
  className,
  text,
  variant = 'primary',
  link,
  onClick,
  ...props
}) {
  const componentClassName = cx('c-button', className, {
    [`c-button--${variant}`]: variant,
  });

  const handleClick = () => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      {link ? (
        <Link className={componentClassName} href={link} {...props}>
          {' '}
          {text}{' '}
        </Link>
      ) : (
        <button className={componentClassName} onClick={handleClick} {...props}>
          {text}
        </button>
      )}
    </>
  );
}
