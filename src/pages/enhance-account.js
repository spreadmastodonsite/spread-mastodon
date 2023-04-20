import { useState, useEffect } from 'react';
import Head from 'next/head';
import Card from '@/components/molecules/Card';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';

import { enhanceAccountData } from '/data/enhanceAccount.js';
import Button from '@/components/molecules/Button';

export default function Home() {
  const [rotateIndex, setRotateIndex] = useState(0);
  const heading = enhanceAccountData.heading;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotateIndex((index) => (index + 1) % heading.textRotate.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

      <main>
        <Grid className="u-text-align--center">
          <GridItem columnStart={4} columnEnd={10}>
            {/* <img src="/mastodon.svg" alt="Logo goes here" /> */}
            <h1 className="c-heading-one__special">
              <div>
                <span>{heading.textOne} </span>{' '}
                <span className="c-heading-one__rotate">
                  {' '}
                  {heading.textRotate[rotateIndex]}
                </span>{' '}
              </div>
              <span>{heading.textTwo}</span>
            </h1>
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
