import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Card from '@/components/Organism/Card';
import Button from '@/components/atoms/Button';
import StepperHeader from '@/components/molecules/StepperHeader';
import { moreWaysToShareData as data } from '../../data/moreWaysToShare';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';

export default function MoreWaysToShare() {
  return (
    <div className="content-wrapper">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
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
        <Grid className="u-text-align--center">
          <GridItem columnStart={10} columnEnd={13}>
            <Button text={data.ctaButton.text} link={data.ctaButton.link} />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
