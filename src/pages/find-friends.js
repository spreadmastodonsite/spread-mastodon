import Image from 'next/image';
import Head from 'next/head';

import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Card from '@/components/Organism/Card';
import Button from '@/components/atoms/Button';
import StepperHeader from '@/components/molecules/StepperHeader';
import Logo from '@/components/atoms/Logo';

import { findFriendsData as data } from '/data/findFriends.js';

export default function FindFriends() {
  return (
    <div className="content-wrapper">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
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
          <p className="u-text-align--center u-body--lg u-margin-bottom--xl">
            {data.description.text}
          </p>
          <Grid className="u-margin-bottom--2xl c-find-friends__grid">
            <GridItem columnStart={2} columnEnd={8}>
              <div className="c-find-friends__content">
                {data.paragraphs.map((paragraph, index) => (
                  <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: paragraph.text }}
                  />
                ))}
              </div>
            </GridItem>
            <GridItem columnStart={8} columnEnd={12}>
              <Card className="c-find-friends__card" variant="basic">
                <img src="/whosum.png" alt="whosum" />
                <h2 className="c-card__title">{data.appCard.title}</h2>
                <p className="u-body--copy">
                  {data.appCard.description}
                </p>
                <Button
                  link={data.appCard.buttonLink}
                  newTab={true}
                  text={data.appCard.buttonText}
                  variant="small"
                />
              </Card>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem columnStart={2} columnEnd={7}>
              <Button text={data.ctaButton.text} link={data.ctaButton.link} />
            </GridItem>
            <GridItem columnStart={7} columnEnd={12}>
              <Button
                variant="secondary"
                text={data.skipButton.text}
                link={data.skipButton.link}
              />
            </GridItem>
          </Grid>
        </div>
      </main>
    </div>
  );
}
