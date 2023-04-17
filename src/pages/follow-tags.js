import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function FollowSuggestions() {
  const router = useRouter();

  // ! Need an admin token to get the ID of the tag
  const suggestedTags = [
    {
      id: 3,
      name: 'throwbackthursday',
      url: 'https://mastodon.social/tags/throwbackthursday',
    },
    {
      id: 4,
      name: 'marvel',
      url: 'https://mastodon.social/tags/marvel',
    },
    {
      id: 5,
      name: 'movies',
      url: 'https://mastodon.social/tags/movies',
    },
  ];

  const followUser = async (targetTagId, username) => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
      await axios.post('/api/follow', {
        accessToken,
        targetTagId,
      });

      // @TODO: This message is still displaying success even if the user isn't
      // authenticated and follow fails. The user needs to be authenticated for
      // the follow to work.
      alert(`You are now following #${username}`);
    } catch (error) {
      alert(`Error: ${JSON.stringify(error.response.data.error)}`);
    }
  };

  return (
    <div>
      <h1>Follow Topics</h1>
      <p>
        Please check your email and click the confirmation link. Once confirmed,
        click the button below and log in to authenticate and view suggested
        users to follow.
      </p>
      {/* Render the suggested users list */}
      <div>
        <h2>Suggested Topics</h2>
        <ul>
          {suggestedTags.map((tag) => (
            <li key={tag.id}>
              <a href={tag.url} target="_blank" rel="noopener noreferrer">
                {tag.name}
              </a>{' '}
              <button onClick={() => followUser(tag.id, tag.name)}>
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => router.push('/')}>Back to Signup</button>
    </div>
  );
}
