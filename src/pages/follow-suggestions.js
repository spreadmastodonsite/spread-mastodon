import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Button from '@/components/molecules/Button';
import Link from 'next/link';

import { followSuggestionsData as data } from '/data/followSuggestions';
import ToolTip from '@/components/molecules/ToolTip';
import Modal from '@/components/molecules/Modal';
import Grid from '@/components/layout/Grid';
import Card from '@/components/molecules/Card';
import GridItem from '@/components/layout/GridItem';

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

  const categories = [
    {
      title: 'Popular Figures',
      accounts: [
        {
          id: '13179',
          username: 'Mastodon',
          url: 'https://mastodon.social/@Mastodon',
        },
        { 
          id: '1',
          username: 'Gargron',
          url: 'https://mastodon.social/@Gargron'
        },
        {
          id: '109373774912342849',
          username: 'wonderofscience',
          url: 'https://mastodon.social/@wonderofscience',
        },  
      ]
    },
    {
      title: 'Topic Curators',
      accounts: [
        {
          id: '13179',
          username: 'Mastodon',
          url: 'https://mastodon.social/@Mastodon',
        },
        { 
          id: '1',
          username: 'Gargron',
          url: 'https://mastodon.social/@Gargron'
        },
        {
          id: '109373774912342849',
          username: 'wonderofscience',
          url: 'https://mastodon.social/@wonderofscience',
        },  
      ]
    },
    {
      title: 'Columnists',
      accounts: [
        {
          id: '13179',
          username: 'Mastodon',
          url: 'https://mastodon.social/@Mastodon',
        },
        { 
          id: '1',
          username: 'Gargron',
          url: 'https://mastodon.social/@Gargron'
        },
        {
          id: '109373774912342849',
          username: 'wonderofscience',
          url: 'https://mastodon.social/@wonderofscience',
        },  
      ]
    },
    {
      title: 'News & Journalism',
      accounts: [
        {
          id: '13179',
          username: 'Mastodon',
          url: 'https://mastodon.social/@Mastodon',
        },
        { 
          id: '1',
          username: 'Gargron',
          url: 'https://mastodon.social/@Gargron'
        },
        {
          id: '109373774912342849',
          username: 'wonderofscience',
          url: 'https://mastodon.social/@wonderofscience',
        },  
      ]
    },
    {
      title: 'Tech',
      accounts: [
        {
          id: '13179',
          username: 'Mastodon',
          url: 'https://mastodon.social/@Mastodon',
        },
        { 
          id: '1',
          username: 'Gargron',
          url: 'https://mastodon.social/@Gargron'
        },
        {
          id: '109373774912342849',
          username: 'wonderofscience',
          url: 'https://mastodon.social/@wonderofscience',
        },  
      ]
    },
    {
      title: 'Medical & Covid',
      accounts: [
        {
          id: '13179',
          username: 'Mastodon',
          url: 'https://mastodon.social/@Mastodon',
        },
        { 
          id: '1',
          username: 'Gargron',
          url: 'https://mastodon.social/@Gargron'
        },
        {
          id: '109373774912342849',
          username: 'wonderofscience',
          url: 'https://mastodon.social/@wonderofscience',
        },  
      ]
    }
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
    <div>
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="l-main">
        <div className="u-text-align--center">
          <h1>{data.heading.text}</h1>
          <h1>{data.heading2.text}</h1>
          <p>
            <ToolTip
              label={data.subHeading.toolTip.label}
              value={data.subHeading.toolTip.value}
            />
            {' '}{data.subHeading.text}
          </p>
        </div>
        {/* Render the suggested users list */}
        <div className="u-margin-bottom--lg">
          <Grid>
            <GridItem columnStart={3} columnEnd={11}>
              <h2>{data.secondHeading.text}</h2>
              <Grid variant="3up">
                {categories.map((category) => {
                  return (
                    <GridItem key={category.title} className="l-grid-item__auto">
                      <Card>
                      <Modal
                        label={category.title}
                        subLabel={`${category.accounts.length} Accounts`}
                        value={category.accounts.map((user) => (
                          <div key={user.id}>
                            <Link href={user.url} target="_blank" rel="noopener noreferrer">
                              {user.username}
                            </Link>{' '}
                            <Button
                              onClick={() => followUser(user.id, user.username)}
                              text={data.followUserButton.text + ' ' + user.username}
                              loading={loading}
                            />
                          </div>
                        ))}
                      />
                      </Card>
                    </GridItem>
                  )
                })}
              </Grid>
            </GridItem>
          </Grid>
        </div>
        <Grid>
          <GridItem columnStart={3} columnEnd={7}>
            <Button
              onClick={followAllUsers}
              text={data.followAllButton.text}
              loading={loading}
              className="u-margin-bottom--md"
            />
          </GridItem>
          <GridItem columnStart={7} columnEnd={11}>
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
          
            <Button
              link="/follow-tags"
              text="Follow Tags"
              className="u-margin-bottom--md"
            />
          </GridItem>
          <GridItem columnStart={3} columnEnd={11}>
            <Button
              link="/"
              text={data.backToHomeButton.text}
              className="u-margin-bottom--md"
            />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
