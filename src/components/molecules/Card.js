import cx from 'classnames';
import Button from './Button';
import Icon from '../atoms/icon';

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
  contentSize,
}) {
  const componentClassName = cx('c-card', className, {
    [`c-card--${contentSize}`]: contentSize,
  });

  return (
    <div className={componentClassName}>
      <div className="c-card__icon">
        {iconName && (
          <Icon
            className="c-card__icon"
            iconName={iconName}
            width={iconWidth}
            height={iconHeight}
          />
        )}
      </div>
      {title && <h2 className="c-card__title ">{title}</h2>}
      <div className="c-card__content">
        {linkText && <Button text={linkText} link={link} />}
        {description && <p className="u-body-copy">{description}</p>}
        {children}
      </div>
    </div>
  );
}
