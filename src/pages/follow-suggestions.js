import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import Button from '@/components/molecules/Button';
import Link from 'next/link';

import { followSuggestionsData as data } from '/data/followSuggestions';

export default function FollowSuggestions() {
  const [loading, setLoading] = useState(false);
  const [followedUsers, setFollowedUsers] = useState([]);

  // Suggested users to follow on signup success. Add more if you want!
  const suggestedUsers = [
    {
      id: '13179',
      username: 'Mastodon',
      url: 'https://mastodon.social/@Mastodon',
    },
    { id: '1', username: 'Gargron', url: 'https://mastodon.social/@Gargron' },
    {
      id: '109373774912342849',
      username: 'wonderofscience',
      url: 'https://mastodon.social/@wonderofscience',
    },
  ];

  const followAllUsers = async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    setLoading(true);
    try {
      const followPromises = suggestedUsers.map(async (user) => {
        await axios.post('/api/follow', {
          accessToken,
          targetAccountId: user.id,
        });
        return user.username;
      });

      const followedUsernames = await Promise.all(followPromises);
      setFollowedUsers(followedUsernames);

      alert(`You are now following ${followedUsernames.join(', ')}`);
    } catch (error) {
      alert(`Error: ${JSON.stringify(error.response.data.error.error)}`);
    }

    setLoading(false);
  };

  const followUser = async (targetAccountId, username) => {
    const accessToken = sessionStorage.getItem('accessToken');

    setLoading(true);
    try {
      await axios.post('/api/follow', {
        accessToken,
        targetAccountId,
      });

      alert(`You are now following ${username}`);
    } catch (error) {
      alert(`Error: ${JSON.stringify(error.response.data.error.error)}`);
    }

    setLoading(false);
  };

  return (
    <main>
      <h1>{data.heading.text}</h1>
      <p>{data.subHeading.text}</p>
      {/* Render the suggested users list */}
      <div>
        <h2>{data.secondHeading.text}</h2>
        <ul>
          {suggestedUsers.map((user) => (
            <li key={user.id}>
              <Link href={user.url} target="_blank" rel="noopener noreferrer">
                {user.username}
              </Link>{' '}
              <Button
                onClick={() => followUser(user.id, user.username)}
                text={data.followUserButton.text + ' ' + user.username}
                loading={loading}
              />
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={followAllUsers}
        text={data.followAllButton.text}
        loading={loading}
      />
      {followedUsers.length > 0 && (
        <div>
          <h2>Followed Users</h2>
          <ul>
            {followedUsers.map((username) => (
              <li key={username}>{username}</li>
            ))}
          </ul>
        </div>
      )}
      <Button link="/follow-tags" text="Follow Tags" />
      <Button link="/" text={data.backToHomeButton.text} />
    </main>
  );
}
