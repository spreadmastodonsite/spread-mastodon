import cx from 'classnames';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';

import { disclaimer } from '/data/universal';

export default function Footer({ className }) {
  const componentClassName = cx('l-footer', className, {});

  return (
    <footer className={componentClassName}>
      <Grid>
        <GridItem columnStart={5} columnEnd={9}>
          <p className="u-font-weight--normal u-text-align--center u-body-copy">
            {disclaimer.lineOne}
            <br />
            {disclaimer.lineTwo}
          </p>
        </GridItem>
      </Grid>
    </footer>
  );
}
