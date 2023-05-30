import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Card from '@/components/Organism/Card';
import { moreWaysToEnhanceData as data } from '../../data/moreWaysToEnhance';
import Logo from '@/components/atoms/Logo';
import StepperHeader from '@/components/molecules/StepperHeader';
import { useRouter } from 'next/router';

export default function MoreWaysToEnhance() {
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
        <Grid className="u-text-align--center u-margin-bottom--xl">
          <GridItem columnStart={1} columnEnd={13}>
            <h1 className="u-margin-bottom--lg">{data.heading.text}</h1>
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
              className="c-more-ways-to-share__card"
              description={card.title}
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
