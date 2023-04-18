import cx from 'classnames';

export default function Grid({
  // children is a special prop that is passed in by React
  children,
  // allows application of custom classes
  className,
  // how the grid displays children and handles responsiveness
  //* 3up | autoFit | autoFill *
  variant,
  // Sets the minimum width of the grid items that are set to auto-fit or auto-fill
  // likely need to tweak as designs come in
  // * xs | sm | md | lg | xl | 2xl
  itemMinWidth = 'md',
  ...props
}) {
  const componentClassName = cx('l-grid', className, {
    [`l-grid--${variant}`]: variant,
    [`l-grid__column--${itemMinWidth}`]: itemMinWidth,
  });

  return (
    <div className={componentClassName} {...props}>
      {children}
    </div>
  );
}
