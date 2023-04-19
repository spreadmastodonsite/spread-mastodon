import cx from 'classnames';
import Link from 'next/link';

export default function Button({
  className,
  text,
  variant = 'primary',
  link,
  onClick,
  loading = false,
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

  const content = loading ? 'Loading...' : text;

  return (
    <>
      {link ? (
        <Link className={componentClassName} href={link} {...props}>
          {content}
        </Link>
      ) : (
        <button className={componentClassName} onClick={handleClick} {...props}>
          {content}
        </button>
      )}
    </>
  );
}
