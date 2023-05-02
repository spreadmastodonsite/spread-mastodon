import Head from 'next/head';
import AnimatedHeader from '@/components/atoms/animatedHeader';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';

import { enhanceAccountData } from '/data/enhanceAccount.js';
import Button from '@/components/molecules/Button';

export default function Home() {
  const heading = enhanceAccountData.heading;

  return (
    <div>
      <Head>
        <title>Mastodon Enhance account</title>
        <meta
          name="description"
          content="Mastodon account signup using Next.js, React and Mastodon API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="l-main">
        <Grid className="u-text-align--center">
          <GridItem columnStart={4} columnEnd={10}>
            {/* <img src="/mastodon.svg" alt="Logo goes here" /> */}
            <AnimatedHeader
              textOne={heading.textOne}
              textTwo={heading.textTwo}
              textRotate={heading.textRotate}
            />
            <p>{enhanceAccountData.subHeading.text}</p>
          </GridItem>
        </Grid>

        <Grid>
          <GridItem columnStart={5} columnEnd={9}>
            <Button
              text={enhanceAccountData.ctaButton.text}
              link={enhanceAccountData.ctaButton.link}
            />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
