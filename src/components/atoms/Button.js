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

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const handleLinkClick = (e) => {
    window.scroll.position.y = 0;
  };

  const content = loading ? 'Loading...' : text;

  const linkProps = typeof link === 'string' ? { href: link } : link;

  return (
    <>
      {link ? (
        <Link
          scroll={true}
          className={componentClassName}
          {...linkProps}
          {...props}
          onClick={handleLinkClick}>
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
