import * as React from 'react';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const components = {
  tr: tr => {
    return (
      <div className="two-column-layout">
        {div.children}
      </div>
    )
  }
}

export default function Post() {
  const [pageData, setPageData] = React.useState();
  const router = useRouter();
  if (router.query.id) {
    import(`./../../../data/utilities/${router.query.id}.md`).then((res) =>
      setPageData(res.default),
    );
  }
  return (
    <Grid>
      <GridItem columnStart={3} columnEnd={11}>
        <Suspense fallback={<div>Loading...</div>}>
          <ReactMarkdown
            className="c-markdown"
            components={components}
            rehypePlugins={[rehypeRaw]}
          >
            {pageData}
          </ReactMarkdown>
        </Suspense>
      </GridItem>
    </Grid>
  );
}
