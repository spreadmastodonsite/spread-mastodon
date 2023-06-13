import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://spreadmastodon.org/spread_mastodon_share.jpg"
        />
        <meta name="twitter:card" content="summary" />
        <script
          defer
          data-domain="spreadmastodon.org"
          src="https://plausible.io/js/script.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
