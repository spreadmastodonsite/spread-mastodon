import { useState } from 'react';
import cx from 'classnames';
import Button from '../atoms/Button';
import Icon from '../atoms/icon';
import Link from 'next/link';

export default function Card({
  className,
  title,
  description,
  iconName,
  iconWidth,
  iconHeight,
  link,
  linkText,
  children,
  variant,
}) {
  const componentClassName = cx('c-card', className, {
    [`c-card--large`]: variant === 'large',
    [`c-card--basic`]: variant === 'basic',
  });

  const [isShown, setIsShown] = useState(false);

  const content = (
    <div className="c-card__content">
      {variant === 'basic' ? (
        <>
          {link && (
            <Link className="c-card__link" href={link}>
              {description}{' '}
              <Icon
                className="c-card__link-icon"
                iconName={isShown ? "caret-right-white" : "caret-right"}
                width={24}
                height={24}
              />
            </Link>
          )}
          {children}
        </>
      ) : (
        <>
          {description && <p className="u-body-copy" dangerouslySetInnerHTML={{ __html: description }} />}
          {linkText && <Button text={linkText} link={link} />}
          {children}
        </>
      )}
    </div>
  );

  return (
    <div
      className={componentClassName}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {iconName && (
        <div className="c-card__icon">
          <Icon
            className="c-card__icon"
            iconName={iconName}
            width={iconWidth}
            height={iconHeight}
          />
          {children}
        </div>
      )}
      {title && <h2 className="c-card__title ">{title}</h2>}
      {content}
    </div>
  );
}
