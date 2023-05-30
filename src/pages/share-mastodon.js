import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import Card from '@/components/Organism/Card';
import GridItem from '@/components/layout/GridItem';
import AnimatedHeader from '@/components/molecules/animatedHeader';

import { shareMastoData as data } from '../../data/shareMastodon';
import Logo from '@/components/atoms/Logo';
import { useRouter } from 'next/router';

export default function ShareMastodon() {
  const router = useRouter();
  const heading = data.heading;
  return (
    <div className="content-wrapper">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href={data.metaData.icon} />
        <meta property="og:title" content={data.metaData.name} />
        <meta property="og:description" content={data.metaData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={router.pathname} />
        <meta
          property="og:image"
          content="https://join-mastodon-poc.vercel.app/spread_mastodon_share.jpg"
        />
        <meta name="twitter:title" content={data.metaData.name} />
        <meta name="twitter:description" content={data.metaData.description} />
        <meta
          name="twitter:image"
          content="https://join-mastodon-poc.vercel.app/spread_mastodon_share.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="l-main">
        <Grid className="u-text-align--center">
          <GridItem columnStart={1} columnEnd={13}>
            <Logo variant="large" />
            <AnimatedHeader
              className="u-heading--3xl"
              textOne={heading.textOne}
              textRotate={heading.textRotate}
              rotateLocation="before"
            />
          </GridItem>
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
              variant="large"
            />
          ))}
        </Grid>
      </main>
    </div>
  );
}
