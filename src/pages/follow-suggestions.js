import { useEffect, useState } from 'react';
import Bottleneck from 'bottleneck';
import Head from 'next/head';
import axios from 'axios';
import Button from '@/components/atoms/Button';
import StepperHeader from '@/components/molecules/StepperHeader';
import Logo from '@/components/atoms/Logo';

import ToolTip from '@/components/Organism/ToolTip';
import Grid from '@/components/layout/Grid';
import Card from '@/components/Organism/Card';
import GridItem from '@/components/layout/GridItem';

import { followSuggestionsData as data } from '/data/followSuggestions';
import Checkbox from '@/components/atoms/checkbox';
import Modal from '@/components/Organism/Modal';
import Icon from '@/components/atoms/icon';

export default function FollowSuggestions() {
  const [loading, setLoading] = useState(false);
  const [followedUsers, setFollowedUsers] = useState();
  const [followedCatUsers, setFollowedCatUsers] = useState();
  const [followedAllUsersSuccess, setFollowedAllUsersSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [toggleValue, setToggleValue] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 30,
  });

  // Follow all users in selected categories
  const followAllCategoryUsers = async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (checkedCategories.length === 0) {
      setResponseMessage('Please select at least one category');
      setToggleValue(true);
      setFollowedCatUsers('');
      return;
    }

    setLoading(true);
    try {
      // Filter the categories to only include those that are checked and create a list of promises to follow each user in those categories
      const followPromises = data.suggestedUsers
        .filter((category) => checkedCategories.includes(category.title))
        .map(async (category) => {
          const categoryFollowPromises = category.accounts.map(async (user) => {
            try {
              // Follow the user using the API and return their username
              await limiter.schedule(() =>
                axios.post('/api/follow', {
                  accessToken,
                  targetAccountId: user.id,
                }),
              );
              return user.username;
            } catch (error) {
              // If an error occurs, reject the promise with the error message
              return Promise.reject(error.response.data.error.error);
            }
          });
          // Wait for all promises to follow users in the category to resolve
          return Promise.all(categoryFollowPromises);
        });
      // Wait for all promises to follow users in selected categories to resolve
      const followedUsernames = await Promise.all(followPromises);

      setFollowedCatUsers(followedUsernames.flat().join(', '));
      // Indicate that all users were followed successfully and display a message with their usernames
      setToggleValue(true);
    } catch (error) {
      // If an error occurs, display an error message
      setErrorMessage(`Error: ${JSON.stringify(error)}`);
    }
    setLoading(false);
  };

  // This function is called whenever a checkbox is changed
  const handleCheckboxChange = (event) => {
    // Destructure the name and checked properties from the event target
    const { name, checked } = event.target;
    setIsChecked([...isChecked, name]);
    if (!checked) {
      setIsChecked(isChecked.filter((item) => item !== name));
    }
    // Update the checkedCategories state based on the checkbox change
    setCheckedCategories((prevCategories) => {
      // Make a copy of the previous categories array
      const updatedCategories = [...prevCategories];

      // Check if the category is already in the array
      const categoryIndex = updatedCategories.indexOf(name);

      // If the checkbox is checked and the category isn't in the array, add it
      if (checked && categoryIndex === -1) {
        updatedCategories.push(name);
      }
      // If the checkbox is unchecked and the category is in the array, remove it
      else if (!checked && categoryIndex !== -1) {
        updatedCategories.splice(categoryIndex, 1);
      }

      setToggleValue(false);

      // Return the updated categories array
      return updatedCategories;
    });

    // Stop the event from propagating further
    event.stopPropagation();
  };

  const handleSelectAll = () => {
    const categories = data.suggestedUsers.map((category) => category.title);
    setCheckedCategories(categories);
    setIsChecked(categories);
  };

  // Get the access token from session storage on component mount
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      setHasAccessToken(true);
    }
  }, []);

  return (
    <div className="content-wrapper">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Logo />
      <main className="l-main c-page__interior">
        <div className="u-text-align--center">
          <StepperHeader
            iconName="enrich"
            iconWidth="75"
            iconHeight="83"
            heading={data.heading.text}
            subHeading={data.subHeading.text}
          />
          <h2 className="u-heading--2xl">{data.secondHeading.text}</h2>
          <div className="u-heading--xl c-follow-category__info ">
            <ToolTip
              iconWidth={24}
              iconHeight={24}
              label={data.toolTip.label}
              value={data.toolTip.value}
            />{' '}
            <span>Accounts you May Be Interested In:</span>
          </div>
          <Grid className="u-margin-bottom--lg">
            <GridItem columnStart={5} columnEnd={9}>
              {!hasAccessToken ? (
                <div>
                  <Button
                    text="Sign in"
                    loading={loading}
                    className="u-margin-bottom--md"
                    variant="secondary"
                    link="enhance-account"
                  />
                </div>
              ) : (
                !followedAllUsersSuccess && (
                  <Button
                    onClick={handleSelectAll}
                    text={data.followAllButton.text}
                    loading={loading}
                    className="u-margin-bottom--md"
                    variant="secondary"
                  />
                )
              )}
            </GridItem>
          </Grid>
        </div>
        {/* Render the suggested users list */}
        {hasAccessToken && (
          <div className="u-margin-bottom--2xl">
            {loading === true ? (
              <Grid>
                <GridItem>
                  <Card variant="basic">
                    <div className="c-follow-category">
                      <div className="c-follow-category--content">
                        <p>
                          This may take awhile. Feel free to navigate away from
                          this page.
                        </p>
                      </div>
                    </div>
                  </Card>
                </GridItem>
              </Grid>
            ) : (
              <>
                <Grid
                  className="u-margin-bottom--xl"
                  variant="autoFit"
                  itemMinWidth="lg">
                  {followedAllUsersSuccess ? (
                    <div>
                      <p>{data.followAllSuccess.text}</p>
                      <p>{followedUsers}</p>
                    </div>
                  ) : (
                    <>
                      {data.suggestedUsers.map((category) => {
                        return (
                          <Card
                            className="c-follow-category__card"
                            key={category.title}
                            variant="basic">
                            {category.icon && (
                              <Icon
                                width={28}
                                height={28}
                                iconName={category.icon}
                              />
                            )}
                            <div className="c-follow-category">
                              <div className="c-follow-category--content">
                                <p>{category.title}</p>
                                {loading === false ? (
                                  <ToolTip
                                    label={`${category.accounts.length} accounts`}
                                    value={
                                      <div>
                                        <p>
                                          {`Here's a list of users we think you'll enjoy`}
                                        </p>
                                        <ul className="c-follow-category__tool-tip">
                                          {category.accounts.map((user) => (
                                            <li key={user.id}>
                                              {user.username}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    }
                                    iconWidth={18}
                                    iconHeight={18}
                                  />
                                ) : (
                                  <p>...loading</p>
                                )}
                              </div>
                              <Checkbox
                                checked={isChecked.includes(category.title)}
                                onChange={handleCheckboxChange}
                                value={category.title}
                                name={category.title}
                              />
                            </div>
                          </Card>
                        );
                      })}
                    </>
                  )}
                </Grid>
                <Modal toggleValue={toggleValue}>
                  <h4>
                    {responseMessage ? (
                      <span>{responseMessage}</span>
                    ) : (
                      <span>You are now following:</span>
                    )}
                  </h4>
                  {followedCatUsers && <p>{followedCatUsers}</p>}
                  {errorMessage && <p>{errorMessage}</p>} {''}
                </Modal>
                <Button
                  className={
                    followedAllUsersSuccess
                      ? 'u-display--none'
                      : 'c-follow-category__follow-selected'
                  }
                  text={data.followSelectedCategoriesButton.text}
                  onClick={followAllCategoryUsers}
                  loading={loading}
                />
              </>
            )}
          </div>
        )}

        <Grid className="c-follow-category__button-row" variant="autoFit">
          <Button
            text={data.nextStepButton.text}
            link={data.nextStepButton.link}
          />
          <Button
            link={data.skipButton.link}
            text={data.skipButton.text}
            variant="secondary"
          />
        </Grid>
      </main>
    </div>
  );
}
