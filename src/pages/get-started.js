import Head from 'next/head';
import Card from '@/components/Organism/Card';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import AnimatedHeader from '@/components/molecules/animatedHeader';
import Logo from '@/components/atoms/Logo';

import { getStartedData as data } from '/data/getStarted.js';

export default function Join() {
  const heading = data.heading;

  return (
    <div className="content-wrapper">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href={data.metaData.icon} />
      </Head>

      <main className="l-main">
        <Grid className="u-text-align--center">
          <GridItem columnStart={1} columnEnd={13}>
            <Logo variant="large" />
            <AnimatedHeader
              className="u-heading--3xl"
              textOne={heading.textOne}
              textRotate={heading.textRotate}
              rotateLocation="newline"
            />
          </GridItem>
        </Grid>

        <Grid variant="autoFit" className="c-card__container">
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
              variant="large"
            />
          ))}
        </Grid>
      </main>
    </div>
  );
}
