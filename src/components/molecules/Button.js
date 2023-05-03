import cx from 'classnames';
import Link from 'next/link';

export default function Button({
  className,
  text,
  variant = 'primary',
  type,
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

  const linkProps = typeof link === 'string' ? { href: link } : link;

  return (
    <>
      {link ? (
        <Link className={componentClassName} {...linkProps} {...props}>
          {content}
        </Link>
      ) : (
        <button
          type={type}
          className={componentClassName}
          onClick={handleClick}
          {...props}>
          {content}
        </button>
      )}
    </>
  );
}
