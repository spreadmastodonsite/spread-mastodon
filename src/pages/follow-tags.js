import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import { followTagsData as data } from '../../data/followTags';
import Link from 'next/link';
import Button from '@/components/molecules/Button';

export default function FollowSuggestions() {
  const router = useRouter();

  const followUser = async (targetTagId, username) => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
      await axios.post('/api/followTags', {
        accessToken,
        targetTagId,
      });

      // @TODO: This message is still displaying success even if the user isn't
      // authenticated and follow fails. The user needs to be authenticated for
      // the follow to work.
      alert(`You are now following #${username}`);
    } catch (error) {
      alert(`Error: ${JSON.stringify(error.response.data.error.error)}`);
    }
  };

  return (
    <div>
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{data.heading.text} </h1>
        <p>{data.subHeading.text}</p>
        <div>
          <h2>
            {data.secondHeading.text} ({data.suggestTags.length})
          </h2>
          {data.suggestTags.map((topic, i) => (
            <>
              <p>{topic.category} </p>
              <ul key={i + topic.category}>
                {topic.tags.map((tag) => (
                  <li key={tag.id}>
                    <Link
                      href={tag.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      {tag.name}
                    </Link>{' '}
                    <Button
                      onClick={() => followUser(tag.id, tag.name)}
                      text={`Follow ${tag.name}`}
                    />
                  </li>
                ))}
              </ul>
            </>
          ))}
        </div>
        <Button link="/" text="homepage" />
      </main>
    </div>
  );
}
