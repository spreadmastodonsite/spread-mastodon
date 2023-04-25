import { useState, useEffect } from 'react';
import Head from 'next/head';
import Card from '@/components/molecules/Card';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';

import { joinData } from '/data/join.js';
import Button from '@/components/molecules/Button';

export default function Join() {
  const heading = joinData.heading;

  return (
    <div>
      <Head>
        <title>{joinData.metaData.title}</title>
        <meta
          name={joinData.metaData.name}
          content={joinData.metaData.description}
        />
        <link rel="icon" href={joinData.metaData.icon} />
      </Head>

      <main>
        <Grid className="u-text-align--center">
          <GridItem columnStart={4} columnEnd={10}>
            {/* <img src="/mastodon.svg" alt="Logo goes here" /> */}
            <h1 className="c-heading-one__special">
              <div>
                <p>
                  {heading.textOne}{' '}
                  <span className="c-heading-one__animation">
                    {heading.textRotate.map((text) => {
                      return (
                        <span key={text} className="c-heading-one__rotate">
                          {text}
                        </span>
                      );
                    })}
                  </span>
                </p>
              </div>
              <span>{heading.textTwo}</span>
            </h1>
            <p>{joinData.subHeading.text}</p>
          </GridItem>
        </Grid>

        <Grid>
          <GridItem columnStart={5} columnEnd={9}>
            <Button text="Let's do it" link="/sign-up" />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
