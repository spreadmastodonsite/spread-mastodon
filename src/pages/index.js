import Head from 'next/head';
import Card from '@/components/molecules/Card';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';

import { homepageCardData as cardData } from '/data/content';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mastodon Signup</title>
        <meta
          name="description"
          content="Mastodon account signup using Next.js, React and Mastodon API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid className="u-text-align--center">
          <GridItem columnStart={4} columnEnd={10}>
            {/* <img src="/mastodon.svg" alt="Logo goes here" /> */}
            <h1>Welcome to your Better Social Home</h1>
            <p>
              We can help you easily join Mastodon, enrich your experience if
              you&apos;ve already joined, and share Mastodon with your friends
              and social networks.
            </p>
          </GridItem>
        </Grid>

        {/* Might make a Grid/Flex component going forward depending on other pages */}
        <Grid variant="autoFit">
          {cardData.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              link={card.link}
              linkText={card.linkText}
            />
          ))}
        </Grid>

        <Grid>
          <GridItem columnStart={5} columnEnd={9}>
            <p className="u-text-align--center">
              This site is not affiliated with Mastodon 9GMBH. © 2023 Spread
              Mastodon. All Rights Reserved.
            </p>
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
