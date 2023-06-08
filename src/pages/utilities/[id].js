import * as React from 'react';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Icon from '@/components/atoms/icon';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';

const components = {
  tr: (tr) => {
    return <div className="two-column-layout">{div.children}</div>;
  },
};

export default function Post() {
  const [pageData, setPageData] = React.useState();
  const router = useRouter();
  const { asPath } = useRouter();
  if (router.query.id) {
    import(`./../../../data/utilities/${router.query.id}.md`).then((res) =>
      setPageData(res.default),
    );
  }

  const shareMastodonMessage = `Join me in the movement to #TakeBackSocial, to find a better social home, and help others do the same.

#SpreadMastodon #Mastodon #Fediverse #OpenSocialWeb

`;

  return (
    <div className="content-wrapper">
      <div className="l-main">
        <Logo variant="small" />
      </div>
      <Grid className="c-markdown l-main c-page__interior">
        <GridItem columnStart={1} columnEnd={13}>
          <Suspense fallback={<div>Loading...</div>}>
            <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
              {pageData}
            </ReactMarkdown>
          </Suspense>
        </GridItem>
        <GridItem columnStart={1} columnEnd={13}>
          <ul className="c-markdown__share">
            <li className="c-markdown__share--item">
              <Link
                href={`https://mastodonshare.com/?url=https://spreadmastodon.org${asPath}&text=${encodeURIComponent(
                  shareMastodonMessage,
                )}`}>
                <Icon iconName="mastodon-logo" width="28" height="28" />
              </Link>
            </li>
            <li className="c-markdown__share--item">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=https://spreadmastodon.org${asPath}`}>
                <Icon iconName="facebook-logo" width="32" height="32" />
              </Link>
            </li>
            <li className="c-markdown__share--item">
              <Link
                href={`https://twitter.com/intent/tweet?url=https://spreadmastodon.org${asPath}&text=${encodeURIComponent(
                  shareMastodonMessage,
                )}!`}>
                <Icon iconName="twitter-logo" width="32" height="32" />
              </Link>
            </li>
            <li className="c-markdown__share--item">
              <Link
                href={`mailto:?subject=Check%20out%20this%20article%20${router.query.id}&body=Hi%2C%0A%0AI%20thought%20you%20might%20be%20interested%20in%20this%article%3A%0A%0Ahttps://spreadmastodon.org${asPath}`}>
                <Icon iconName="envelope" width="32" height="32" />
              </Link>
            </li>
          </ul>
        </GridItem>
      </Grid>
    </div>
  );
}
