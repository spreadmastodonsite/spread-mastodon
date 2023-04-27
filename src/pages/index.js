import Head from 'next/head';
import Card from '@/components/molecules/Card';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import AnimatedHeader from '@/components/atoms/animatedHeader';

import { disclaimer } from '../../data/universal';
import { homepageData as data } from '/data/homepage.js';

export default function Home() {
  const heading = data.heading;

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
            {/* <img src="/mastodon.svg" alt="Logo goes here" /> */}
            <AnimatedHeader
              textOne={heading.textOne}
              textTwo={heading.textTwo}
              textRotate={heading.textRotate}
            />
            <p>{data.subHeading.text}</p>
          </GridItem>
        </Grid>

        {/* Might make a Grid/Flex component going forward depending on other pages */}
        <Grid variant="autoFit">
          {data.cards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              description={card.description}
              iconName={card.icon}
              iconWidth={card.iconWidth}
              iconHeight={card.iconHeight}
              link={card.link}
              linkText={card.linkText}
            />
          ))}
        </Grid>

        <Grid>
          <GridItem columnStart={5} columnEnd={9}>
            <p className="u-text-align--center">{disclaimer}</p>
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
