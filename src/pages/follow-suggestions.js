import { useState } from 'react';
import Bottleneck from "bottleneck";
import Head from 'next/head';
import axios from 'axios';
import Button from '@/components/molecules/Button';
import Link from 'next/link';

import ToolTip from '@/components/molecules/ToolTip';
import Modal from '@/components/molecules/Modal';
import Grid from '@/components/layout/Grid';
import Card from '@/components/molecules/Card';
import GridItem from '@/components/layout/GridItem';

import { followSuggestionsData as data } from '/data/followSuggestions';


export default function FollowSuggestions() {
  const [loading, setLoading] = useState(false);
  const [followedUsers, setFollowedUsers] = useState([]);

  const limiter = new Bottleneck({
    maxConcurrent: 150,
    minTime: 50000
  });

  const followAllUsers = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    setLoading(true);
    try {
      const followPromises = data.suggestedUsers.map(async (category) => {
        category.accounts.map(async (user) => {
          await limiter.schedule(() =>  axios.post('/api/follow', {
            accessToken,
            targetAccountId: user.id,
          }));
          return user.username;
        });
      });

      alert(`You are now following everyone, good work`);
    } catch (error) {
      alert(`Error: ${JSON.stringify(error.response.data.error.error)}`);
    }

    setLoading(false);
  };

  const followAllCategoryUsers = async (category, accounts) => {
    const accessToken = sessionStorage.getItem('accessToken');

    setLoading(true);
    try {
      const followPromises = accounts.map(async (user) => {
        await limiter.schedule(() =>  axios.post('/api/follow', {
          accessToken,
          targetAccountId: user.id,
        }));
        return user.username;
      });

      const followedUsernames = await Promise.all(followPromises);
      setFollowedUsers(followedUsernames);

      alert(`You are now following ${followedUsernames.join(', ')}`);
    } catch (error) {}

    setLoading(false);
  };

  const followUser = async (targetAccountId, username) => {
    const accessToken = sessionStorage.getItem('accessToken');
    setLoading(true);
    try {
      await axios.post('/api/follow', {
        accessToken,
        targetAccountId,
        username,
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
            />{' '}
            {data.subHeading.text}
          </p>
        </div>
        {/* Render the suggested users list */}
        <div className="u-margin-bottom--lg">
          <Grid>
            <GridItem columnStart={3} columnEnd={11}>
              <h2>{data.secondHeading.text}</h2>
              <Grid variant="3up">
                {data.suggestedUsers.map((category) => {
                  return (
                    <GridItem
                      key={category.title}
                      className="l-grid-item__auto">
                      <Card>
                        <Modal
                          label={category.title}
                          subLabel={`${category.accounts.length} Accounts`}
                          value={category.accounts.map((user) => (
                            <div key={user.id}>
                              <Link
                                href={user.url}
                                target="_blank"
                                rel="noopener noreferrer">
                                {user.username}
                              </Link>{' '}
                              <Button
                                onClick={() =>
                                  followUser(user.id, user.username)
                                }
                                text={
                                  data.followUserButton.text +
                                  ' ' +
                                  user.username
                                }
                                loading={loading}
                              />
                            </div>
                          ))}>
                          <Button
                            text="follow all"
                            onClick={() =>
                              followAllCategoryUsers(
                                category.title,
                                category.accounts,
                              )
                            }
                          />
                        </Modal>
                      </Card>
                    </GridItem>
                  );
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
