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
}) {
  const componentClassName = cx('c-card', className, {});

  return (
    <div className={componentClassName}>
      {iconName && (
        <Icon
          className="c-card__icon"
          iconName={iconName}
          width={iconWidth}
          height={iconHeight}
        />
      )}
      {title && <h2 className="c-card__title">{title}</h2>}
      {linkText && <Button text={linkText} link={link} />}
      {description && <p className="c-card__description">{description}</p>}
      {children}
    </div>
  );
}
