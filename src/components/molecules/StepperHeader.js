import cx from 'classnames';
import Icon from '@/components/atoms/icon';

export default function StepperHeader({
  className,
  heading,
  subHeading,
  iconName,
  iconWidth,
  iconHeight,
}) {
  const componentClassName = cx('c-stepper-header', className, {});

  return (
    <>
      <div className={componentClassName}>
        <Icon
          className="c-stepper-header__icon"
          iconName={iconName}
          width={iconWidth}
          height={iconHeight}
        />
        <div className="c-stepper-header__content">
          <h1 className="c-stepper-header__heading">{heading}</h1>
          <p className="c-stepper-header__sub-heading">{subHeading}</p>
        </div>
      </div>
      <hr className="c-stepper-header__hr" />
    </>
  );
}
