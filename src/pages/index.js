import Head from 'next/head';
import Card from '@/components/Organism/Card';
import Logo from '@/components/atoms/Logo';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import AnimatedHeader from '@/components/molecules/animatedHeader';

import { homepageData as data } from '/data/homepage.js';

export default function Home() {
  const heading = data.heading;

  return (
    <div className="content-wrapper">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="l-main">
        <Grid className="u-text-align--center">
          <GridItem columnStart={1} columnEnd={13}>
            <Logo variant="large" />
            <AnimatedHeader
              className="u-heading--3xl"
              textOne={heading.textOne}
              textTwo={heading.textTwo}
              textRotate={heading.textRotate}
              rotateLocation="after"
            />
          </GridItem>
          <GridItem columnStart={2} columnEnd={12}>
            <p className="u-body--lg">{data.subHeading.text}</p>
          </GridItem>
        </Grid>

        {/* Might make a Grid/Flex component going forward depending on other pages */}
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
            />
          ))}
        </Grid>
      </main>
    </div>
  );
}
