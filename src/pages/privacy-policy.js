import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import { privacyPolicy as data } from '../../data/privacy-policy';

export default function PrivacyPolicy() {
  return (
    <div>
      <Grid>
        <GridItem columnStart={5} columnEnd={9}>
          <p className="u-text-align--center">
            {data.content}
          </p>
        </GridItem>
      </Grid>
    </div>
  );
}
