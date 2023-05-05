import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import markdown from './../../data/utils.md';
import ReactMarkdown from "react-markdown";

export default function Utils() {
  return (
    <Grid>
      <GridItem columnStart={3} columnEnd={11}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </GridItem>
    </Grid>
  );
}
