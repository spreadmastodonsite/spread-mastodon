import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Card from '@/components/Organism/Card';
import Button from '@/components/atoms/Button';
import StepperHeader from '@/components/molecules/StepperHeader';
import { moreWaysToShareData as data } from '../../data/moreWaysToShare';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
import { useRouter } from 'next/router';

export default function MoreWaysToShare() {
  const router = useRouter();
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
      <Logo />
      <main className="l-main c-page__interior c-more-ways-to-share">
        <StepperHeader
          iconName="enrich"
          iconWidth="75"
          iconHeight="83"
          heading={data.heading.text}
        />
        <Grid>
          <GridItem columnStart={4} columnEnd={10}>
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
              key={card.description + i}
              className="c-more-ways-to-share__card"
              description={card.description}
              variant="basic"
              link={card.link}
              linkText={card.linkText}
            />
          ))}
        </Grid>
        {data.ctaButton && (
          <Grid className="u-text-align--center">
            <GridItem columnStart={10} columnEnd={13}>
              <Button text={data.ctaButton.text} link={data.ctaButton.link} />
            </GridItem>
          </Grid>
        )}
      </main>
    </div>
  );
}
