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
}) {
  const componentClassName = cx('c-card', className, {});

  return (
    <div className={componentClassName}>
      <Icon
        className="c-card__icon"
        iconName={iconName}
        width={iconWidth}
        height={iconHeight}
      />
      <h2 className="c-card__title">{title}</h2>
      <Button text={linkText} link={link} />
      <p className="c-card__description">{description}</p>
    </div>
  );
}
