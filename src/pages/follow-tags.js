import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { followTagsData as data } from '../../data/followTags';
import Button from '@/components/atoms/Button';
import ToolTip from '@/components/Organism/ToolTip';
import Modal from '@/components/Organism/Modal';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Chip from '@/components/atoms/chip';
import Checkbox from '@/components/atoms/checkbox';
import StepperHeader from '@/components/molecules/StepperHeader';
import Logo from '@/components/atoms/Logo';

export default function FollowSuggestions() {
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  const [isChipChecked, setIsChipChecked] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [followedTags, setFollowedTags] = useState([]);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const followTags = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const tagNames = selectedTags;

    if (tagNames.length === 0) {
      setResponseMessage('Please select at least one tag');
      setToggleValue(true);
      setFollowedTags('');
      return;
    }

    setLoading(true);
    const tagsPromises = tagNames.map(async (tagName) => {
      try {
        const response = await axios.post('/api/followTag', {
          accessToken,
          tagName: tagName,
        });
        return response.data;
      } catch (error) {
        return Promise.reject(error.response.data.error.error);
      }
    });

    try {
      const results = await Promise.all(tagsPromises);
      const followedTags = results.map((result) => result.data.name);
      setResponseMessage('');
      setFollowedTags(followedTags.join(', '));
      setToggleValue(true);
    } catch (error) {
      setErrorMessage(`Error: ${JSON.stringify(error)}`);
    }
    setLoading(false);
  };

  const handleCheckboxChange = (topic, e) => {
    const tags = topic.tags.map((tag) => tag.name);
    const index = selectedTags.indexOf(tags);
    const { name, checked } = e.target;

    setToggleValue(false);

    // if checked add selected tags to the array
    if (checked) {
      setSelectedTags([...selectedTags, ...tags]);
      setIsChecked(false);
    } else if (!checked) {
      setIsChecked(true);
      const updatedTags = [...selectedTags];
      setSelectedTags(
        updatedTags.filter((tag) => {
          return !tags.includes(tag);
        }),
      );
    }
  };

  const handleChipClick = (tag) => {
    const index = selectedTags.indexOf(tag);
    if (index === -1) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      const updatedTags = [...selectedTags];
      updatedTags.splice(index, 1);
      setSelectedTags(updatedTags);
    }
    setToggleValue(false);
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      setHasAccessToken(true);
    }
  }, []);

  useEffect(() => {
    setIsChipChecked(selectedTags.length > 0);
  }, [selectedTags]);

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

          <h2 className="u-heading--2xl">{data.heading2.partOne}</h2>
          <div className="u-heading--xl c-follow-category__info ">
            <ToolTip
              iconWidth={24}
              iconHeight={24}
              label={data.heading2.toolTip.label}
              value={data.heading2.toolTip.value}
            />{' '}
            <span>{data.heading2.partTwo}</span>
          </div>
          {!hasAccessToken ? (
            <Grid className="u-margin-bottom--lg">
              <GridItem columnStart={5} columnEnd={9}>
                <Button
                  text="Sign in"
                  loading={loading}
                  className="u-margin-bottom--md"
                  variant="secondary"
                  link="enhance-account"
                />
              </GridItem>
            </Grid>
          ) : (
            <>
              <div>
                {data.suggestTags.map((topic, i) => (
                  <div key={i + topic.category}>
                    <div className="tag-group">
                      <div className="tag-group__content">
                        <h3 className="tag-group__category u-text-align--left u-heading--xl">
                          {topic.category}{' '}
                        </h3>
                        <ul className="c-chip__group">
                          {topic.tags.map((tag) => (
                            <li className="c-chip__group-item" key={tag.name}>
                              <Chip
                                active={selectedTags.includes(tag.name)}
                                text={tag.name}
                                onClick={handleChipClick}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="tag-group__input">
                        <span>Select All</span>
                        <Checkbox
                          label="Follow"
                          name="follow"
                          value="follow"
                          checked={isChecked}
                          onChange={(e) => handleCheckboxChange(topic, e)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Modal toggleValue={toggleValue}>
                <h4>
                  {responseMessage ? (
                    <span>{responseMessage}</span>
                  ) : (
                    <span>You are now following:</span>
                  )}
                </h4>
                {followedTags && <p>{followedTags}</p>}
                {errorMessage && <p>{errorMessage}</p>} {''}
              </Modal>
              <Button
                className="c-button__follow-tags u-margin-bottom--2xl u-margin-top--md"
                onClick={followTags}
                loading={loading}
                text={data.followTagButton.text}
              />
            </>
          )}
        </div>
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
