import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Card from '@/components/Organism/Card';
import StepperHeader from '@/components/molecules/StepperHeader';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';

import { evenMoreWaysToShareData as data } from '../../data/evenMoreWaysToShare';
import { useRouter } from 'next/router';

export default function MoreWaysToShare() {
  const router = useRouter();
  return (
    <div className="content-wrapper">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <meta property="og:title" content={data.metaData.name} />
        <meta property="og:description" content={data.metaData.description} />
        <meta property="og:url" content={router.pathname} />
        <meta name="twitter:title" content={data.metaData.name} />
        <meta name="twitter:description" content={data.metaData.description} />
      </Head>
      <Logo />
      <main className="l-main c-page__interior c-more-ways-to-share">
        <StepperHeader
          iconName="enrich"
          iconWidth="75"
          iconHeight="83"
          heading={data.heading.text}
        />
        <Grid>
          <GridItem columnStart={3} columnEnd={11}>
            <p className="u-heading--xl u-text-align--center">
              {data.description.text}
              <Link className="c-link" href={data.description.link}>
                {data.description.linkText}
              </Link>
            </p>
          </GridItem>
        </Grid>
        <Grid
          variant="autoFit"
          itemMinWidth="lg"
          className="u-text-align--center">
          {data.cards.map((card, i) => (
            <Card
              key={card.title + i}
              className="c-more-ways-to-share__card"
              description={card.description}
              variant="basic"
              link={card.link}
              linkText={card.linkText}
            />
          ))}
        </Grid>
      </main>
    </div>
  );
}
