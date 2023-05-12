import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Card from '@/components/Organism/Card';
import Button from '@/components/atoms/Button';

import { findFriendsData as data } from '/data/findFriends.js';

export default function FindFriends() {
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
            <h1>{data.heading.text}</h1>
            <h2>{data.subHeading.text}</h2>
          </GridItem>
          <GridItem columnStart={4} columnEnd={10}>
            <p>{data.description.text}</p>
          </GridItem>
          <GridItem columnStart={3} columnEnd={9}>
            <Card title="[IMAGE OF TOOLSET USER INTERFACE IN ACTION]" />
          </GridItem>
          <GridItem columnStart={9} columnEnd={11}>
            <Card title="Try this app now" />
          </GridItem>
        </Grid>

        <Grid>
          <GridItem columnStart={3} columnEnd={9}>
            <Button text={data.ctaButton.text} link={data.ctaButton.link} />
          </GridItem>
          <GridItem columnStart={9} columnEnd={11}>
            <Button text={data.skipButton.text} link={data.skipButton.link} />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
