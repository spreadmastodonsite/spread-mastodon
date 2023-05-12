import Head from 'next/head';
import Card from '@/components/molecules/Card';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import AnimatedHeader from '@/components/atoms/animatedHeader';
import Logo from '@/components/atoms/Logo';

import { joinData as data } from '/data/join.js';

export default function Join() {
  const heading = data.heading;

  return (
    <div className="content-wrapper c-page__join">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href={data.metaData.icon} />
      </Head>

      <main className="l-main">
        <Grid className="u-text-align--center">
          <GridItem columnStart={1} columnEnd={13}>
            <Logo />
            <AnimatedHeader
              className="u-heading--3xl"
              textOne={heading.textOne}
              textTwo={heading.textTwo}
              textRotate={heading.textRotate}
            />
          </GridItem>

          {/* <p className="u-body--lg">{data.subHeading.text}</p> */}
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
