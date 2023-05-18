import Image from 'next/image';
import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';

import Card from '@/components/Organism/Card';
import Button from '@/components/atoms/Button';
import StepperHeader from '@/components/molecules/StepperHeader';
import Logo from '@/components/atoms/Logo';

import { findFriendsData as data } from '/data/findFriends.js';
import Link from 'next/link';

export default function FindFriends() {
  return (
    <div className="content-wrapper">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Logo />

      <main className="l-main c-page__interior">
        <div>
          <StepperHeader
            iconName="enrich"
            iconWidth="75"
            iconHeight="83"
            heading={data.heading.text}
            subHeading={data.subHeading.text}
          />
          <p className="u-text-align--center u-body--lg u-margin-bottom--lg">
            {data.description.text}
          </p>
          <Grid className="u-margin-bottom--2xl c-find-friends__grid">
            <GridItem columnStart={2} columnEnd={8}>
              <div className="c-find-friends__content">
                <p className="u-body--copy">
                  Although Twitter has shut down most tools for discovering your
                  Twitter friends on Mastodon, there is a browser extension that
                  lets you index your Twitter followers, and then match them to
                  Mastodon users.
                </p>
                <p className="u-body--copy">
                  <strong>
                    Once you install it, go to your Twitter followers, scan
                    them, and then sync those to Mastodon users.
                  </strong>
                </p>
                <p className="u-body--copy">
                  <Link
                    className="c-link"
                    href="https://scafaria.com/whosum-and-the-mastodon-migration-3855788c6373">
                    Find out more
                  </Link>
                  , and try it out today!
                </p>
              </div>
            </GridItem>
            <GridItem columnStart={8} columnEnd={12}>
              <Card className="c-find-friends__card" variant="basic">
                <span
                  className="c-find-friends__card-logo u-heading--2xl"
                  aria-hidden>
                  + &#x3A3;
                </span>
                <h2 className="c-card__title ">Whosum Social Assistant</h2>
                <p className="u-body--copy">
                  Available for Chrome and Edge (Firefox coming soon).
                </p>
                <Button
                  link="https://whosum.com/assistant"
                  newTab={true}
                  text="View details & Install"
                />
              </Card>
            </GridItem>
          </Grid>
          <Grid variant="autoFit">
            <Button text={data.ctaButton.text} link={data.ctaButton.link} />
            <Button
              variant="secondary"
              text={data.skipButton.text}
              link={data.skipButton.link}
            />
          </Grid>
        </div>
      </main>
    </div>
  );
}
