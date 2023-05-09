import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import { followTagsData as data } from '../../data/followTags';
import Link from 'next/link';
import Button from '@/components/molecules/Button';
import ToolTip from '@/components/molecules/ToolTip';
import Modal from '@/components/molecules/Modal';
import Grid from '@/components/layout/Grid';
import Card from '@/components/molecules/Card';
import GridItem from '@/components/layout/GridItem';


export default function FollowSuggestions() {
  const router = useRouter();

  const followUser = async (tagName) => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
      await axios.post('/api/followTag', {
        accessToken,
        tagName,
      });

      // @TODO: This message is still displaying success even if the user isn't
      // authenticated and follow fails. The user needs to be authenticated for
      // the follow to work.
      alert(`You are now following #${tagName}`);
    } catch (error) {
      alert(`Error: ${JSON.stringify(error.response)}`);
    }
  };

  return (
    <div>
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="l-main">
        <div className="u-text-align--center">
          <h1>{data.heading.text}</h1>
          <h1>
            {data.heading2.partOne}{' '}
            <ToolTip
              label={data.heading2.toolTip.label}
              value={data.heading2.toolTip.value}
            />{' '}
            {data.heading2.partTwo}
          </h1>
          <p>
            <ToolTip
              label={data.subHeading.toolTip.label}
              value={data.subHeading.toolTip.value}
            />
            {' '}{data.subHeading.text}
          </p>
        </div>
        <div>
          <h2>
            {data.secondHeading.text} ({data.suggestTags.length})
          </h2>
          {data.suggestTags.map((topic, i) => (
            <div key={i + topic.category}>
              <p>{topic.category} </p>
              <ul>
                {topic.tags.map((tag) => (
                  <li key={tag.id}>
                    <Link
                      href={tag.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      {tag.name}
                    </Link>{' '}
                    <Button
                      onClick={() => followUser(tag.name)}
                      text={`Follow ${tag.name}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Button link="/" text="homepage" />
      </main>
    </div>
  );
}
