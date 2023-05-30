import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="article" />
        <meta name="twitter:image" content="/spread_mastodon_share.jpg" />
        <meta property="og:image" content="/spread_mastodon_share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <title>Spread Mastodon - {data.metaData.title}</title> */}
        <meta name={data.metaData.name} content={data.metaData.description} />
        <meta property="og:title" content={data.metaData.name} />
        <meta property="og:description" content={data.metaData.description} />
        <meta property="og:url" content={router.pathname} />
        <meta name="twitter:title" content={data.metaData.name} />
        <meta name="twitter:description" content={data.metaData.description} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
