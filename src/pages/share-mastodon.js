import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import Card from '@/components/molecules/Card';
import GridItem from '@/components/layout/GridItem';
import Button from '@/components/molecules/Button';
import AnimatedHeader from '@/components/atoms/animatedHeader';

import { shareMastonData as data } from '../../data/shareMastodon';

export default function Join() {
  const heading = data.heading;

  return (
    <div className="content-wrapper">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href={data.metaData.icon} />
      </Head>

      <main className="l-main">
        <Grid className="u-text-align--center">
          <GridItem columnStart={4} columnEnd={10}>
            <img
              src="/-e-SpreadMastodon_Logo.png"
              alt="Spread Mastodon | Take Back Social"
              className="c-logo"
            />
            <AnimatedHeader
              className="u-heading--3xl"
              textTwo={heading.textTwo}
              textRotate={heading.textRotate}
            />
          </GridItem>

          {/* <p className="u-body--lg">{data.subHeading.text}</p> */}
        </Grid>

        <Grid variant="autoFit" className="c-card__container">
          {data.cards.map((card) => (
            <Card
              className="c-card--share"
              key={card.title}
              title={card.title}
              description={card.description}
              iconName={card.icon}
              iconWidth={card.iconWidth}
              iconHeight={card.iconHeight}
              link={card.link}
              linkText={card.linkText}
              contentSize="large"
            />
          ))}
        </Grid>
      </main>
    </div>
  );
}
