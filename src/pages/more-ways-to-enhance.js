import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Card from '@/components/Organism/Card';
import { moreWaysToEnhanceData as data } from '../../data/moreWaysToEnhance';
import Logo from '@/components/atoms/Logo';

export default function MoreWaysToEnhance() {
  const [origin, setOrigin] = useState();

  const router = useRouter();
  const getOrigin = () => {
    setOrigin(window.location.origin)
  }

  useEffect(() => {
    getOrigin()
  }, []);
  return (
    <div className="content-wrapper">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={data.metaData.name} />
        <meta property="og:description" content={data.metaData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={router.pathname} />
        <meta property="og:image" content="https://join-mastodon-poc.vercel.app/spread_mastodon_share.jpg" />
        <meta name="twitter:title" content={data.metaData.name} />
        <meta name="twitter:description" content={data.metaData.description} />
        <meta name="twitter:image" content="https://join-mastodon-poc.vercel.app/spread_mastodon_share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Logo />
      <main className="l-main">
        <Grid className="u-text-align--center u-margin-bottom--xl">
          <GridItem columnStart={4} columnEnd={10}>
            <h1>{data.heading.text}</h1>
            <h2>{data.subHeading.text}</h2>
          </GridItem>
        </Grid>
        <Grid
          variant="autoFit"
          itemMinWidth="lg"
          className="u-text-align--center">
          {data.cards.map((card, i) => (
            <Card
              key={card.title + i}
              className="u-card__more-ways-to-share"
              title={card.title}
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
