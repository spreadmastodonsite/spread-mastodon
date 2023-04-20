import cx from 'classnames';
import Link from 'next/link';

export default function Button({
  className,
  text,
  variant = 'primary',
  type,
  link,
  onClick,
  ...props
}) {
  const componentClassName = cx('c-button', className, {
    [`c-button--${variant}`]: variant,
  });

  const handleClick = () => {
    if (onClick) {
      onClick();
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
        <button
          type={type}
          className={componentClassName}
          onClick={handleClick}
          {...props}>
          {text}
        </button>
      )}
    </>
  );
}
