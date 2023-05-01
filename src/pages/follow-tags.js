import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import { followTagsData as data } from '../../data/followTags';
import Link from 'next/link';
import Button from '@/components/molecules/Button';

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
        <h1>{data.heading.text} </h1>
        <p>{data.subHeading.text}</p>
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
