import Head from 'next/head';
import Logo from '@/components/atoms/Logo';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import { errorData as data } from '/data/404.js';
import { useRouter } from 'next/router';

export default function custom404() {
  return (
    <div className="content-wrapper">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <meta property="og:title" content={data.metaData.name} />
        <meta property="og:description" content={data.metaData.description} />
        <meta property="og:url" content="spreadmastodon.org" />
        <meta name="twitter:title" content={data.metaData.name} />
        <meta name="twitter:description" content={data.metaData.description} />
      </Head>

      <main className="l-main">
        <Grid className="u-text-align--center">
          <GridItem columnStart={1} columnEnd={13}>
            <Logo variant="large" />
          </GridItem>
          <GridItem
            className="u-margin-bottom--2xl"
            columnStart={1}
            columnEnd={13}>
            <h1 className="u-heading--3xl">{data.heading.textOne}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.subHeading.text }} />
          </GridItem>
          <GridItem columnStart={2} columnEnd={12}>
            <div
              className="u-margin-bottom--2xl"
              dangerouslySetInnerHTML={{ __html: data.description.text }}
            />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
