import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Button from '@/components/molecules/Button';
import AnimatedHeader from '@/components/atoms/animatedHeader';

import { shareMastonData as data } from '../../data/shareMastodon';

export default function ShareMastodon() {
  return (
    <div>
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="l-main">
        <Grid className="u-text-align--center">
          <GridItem columnStart={4} columnEnd={10}>
            <AnimatedHeader
              textRotate={data.heading.textRotate}
              textTwo={data.heading.textTwo}
            />
            <h2>{data.subHeading.text}</h2>
          </GridItem>
          <GridItem columnStart={4} columnEnd={10}>
            <p>{data.description.text}</p>
          </GridItem>
          <GridItem columnStart={5} columnEnd={9}>
            <Button text={data.ctaButton.text} link={data.ctaButton.link} />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
