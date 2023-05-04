import cx from 'classnames';
import Image from 'next/image';

export default function Icon({ className, iconName, width, height, ...props }) {
  const componentClassName = cx('c-icon', `c-icon--${iconName}`, className, {});

  return (
    <div className={componentClassName}>
      <Image
        className="c-icon__image"
        src={`/assets/icons/${iconName}.svg`}
        alt={iconName}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
}
