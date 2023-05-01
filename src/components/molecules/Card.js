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
      <div className="c-card__icon">
        {/* <img src={icon} alt={title} /> */}
        {iconName && (
          <Icon
            className="c-card__icon"
            iconName={iconName}
            width={iconWidth}
            height={iconHeight}
          />
        )}
      </div>
      {title && <h2 className="u-heading--xl u-normal">{title}</h2>}
      <div className="c-card__content">
        {linkText && <Button text={linkText} link={link} />}
        {description && <p className="u-body-copy">{description}</p>}
        {children}
      </div>
    </div>
  );
}
