import cx from 'classnames';

export default function GridItem({
  // children is a special prop that is passed in by React
  children,
  // allows application of custom classes
  className,
  // allows for custom column start
  // * 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | negOne *
  columnStart,
  // allows for custom column end
  // * 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | negOne *
  columnEnd,
  ...props
}) {
  const componentClassName = cx('l-grid-item', className, {
    [`l-grid-item__column-start--${columnStart}`]: columnStart,
    [`l-grid-item__column-end--${columnEnd}`]: columnEnd,
  });

  return (
    <div className={componentClassName} {...props}>
      {children}
    </div>
  );
}
