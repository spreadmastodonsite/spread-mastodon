import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Button from '@/components/molecules/Button';

import { disclaimer } from '../../data/universal';
import { explainerData as data } from '/data/explainer.js';

export default function MastodonExplainer() {
  return (
    <div>
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid className="u-text-align--center">
          <GridItem columnStart={4} columnEnd={10}>
            <h1>{data.heading.text}</h1>
            <h2>{data.subHeading.text}</h2>
          </GridItem>
          <GridItem columnStart={4} columnEnd={10}>
            <p>{data.contentOne.text}</p>
            <p>{data.contentTwo.text}</p>
            <p>{data.contentThree.text}</p>
          </GridItem>
          <GridItem columnStart={5} columnEnd={9}>
            <Button text={data.ctaButton.text} link={data.ctaButton.link} />
          </GridItem>
          <GridItem columnStart={5} columnEnd={9}>
            <p className="u-text-align--center">{disclaimer}</p>
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
