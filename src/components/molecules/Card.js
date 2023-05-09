import cx from 'classnames';
import Button from './Button';
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

  return (
    <div className={componentClassName}>
      {iconName && (
        <div className="c-card__icon">
          <Icon
            className="c-card__icon"
            iconName={iconName}
            width={iconWidth}
            height={iconHeight}
          />
        </div>
      )}
      {title && <h2 className="c-card__title ">{title}</h2>}
      <div className="c-card__content">
        {variant === 'basic' ? (
          <Link className="c-card__link" href={link}>
            {description}{' '}
            <Icon
              className="c-card__link-icon"
              iconName="join"
              width={16}
              height={24}
            />
          </Link>
        ) : (
          <>
            {description && <p className="u-body-copy">{description}</p>}
            {linkText && <Button text={linkText} link={link} />}
            {children}
          </>
        )}
      </div>
    </div>
  );
}
