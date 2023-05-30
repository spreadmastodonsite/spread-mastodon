import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import Button from '@/components/atoms/Button';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import StepperHeader from '@/components/molecules/StepperHeader';
import Image from 'next/image';
import axios from 'axios';
import Logo from '@/components/atoms/Logo';
import Icon from '@/components/atoms/icon';

import { updateAccountData as dataContent } from '../../data/updateAccount';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function UpdateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(
    dataContent.defaultAvatarImage.src,
  );
  const [base64, setbase64] = useState('');
  const [backgroundSrc, setBackgroundSrc] = useState(
    dataContent.defaultBackgroundImage.src,
  );
  const [BgBase64, setBgBase64] = useState('');
  const [user, setUser] = useState();
  const [bio, setBio] = useState(dataContent.bio.text);

  const updateBio = (event) => {
    setBio(event.target.value);
  };

  // get the bio to update with useEffect
  useEffect(() => {
    if (bio !== dataContent.bio.text) {
      setBio(watch('bio'));
    }
  }, [watch('bio')]);

  const getAccount = async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
      const response = await axios.get(
        `/api/verifyAccount?accessToken=${accessToken}`,
      );

      setUser(response.data);
    } catch (error) {
      throw new Error(
        `Error verifying account: ${JSON.stringify(
          error.response.data.error.error,
        )}`,
      );
    }
  };

  const onSubmit = async (data) => {
    const accessToken = sessionStorage.getItem('accessToken');
    setLoading(true);

    try {
      const response = await axios.patch('/api/updateAccount', {
        accessToken,
        bio: data.bio,
        avatar: base64,
        header: BgBase64,
      });
      setSuccess(true);
    } catch (error) {}

    setLoading(false);
  };

  //TODO: make this more dry
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setbase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const updateAvatar = (event) => {
    setAvatarSrc(URL.createObjectURL(event.target.files[0]));
    getBase64(event.target.files[0]);
  };

  //TODO: make this more dry
  function getBgBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBgBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const updateBackground = (event) => {
    setBackgroundSrc(URL.createObjectURL(event.target.files[0]));
    getBgBase64(event.target.files[0]);
  };

  const handleAvatarButtonClick = (e) => {
    document.getElementById('avatar').click();
  };

  const handleBackgroundButtonClick = (e) => {
    document.getElementById('background').click();
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      setHasAccessToken(true);
    }
  }, []);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      setTimeout(() => {
        getAccount();
      }, 500);
    }
  }, []);
  const router = useRouter();
  return (
    <div className="content-wrapper">
      <Head>
        <title>Mastodon Update Account</title>
        <meta
          name="description"
          content="Mastodon account signup using Next.js, React and Mastodon API"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={dataContent.metaData.name} />
        <meta
          property="og:description"
          content={dataContent.metaData.description}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={router.pathname} />
        <meta
          property="og:image"
          content="https://join-mastodon-poc.vercel.app/spread_mastodon_share.jpg"
        />
        <meta name="twitter:title" content={dataContent.metaData.name} />
        <meta
          name="twitter:description"
          content={dataContent.metaData.description}
        />
        <meta
          name="twitter:image"
          content="https://join-mastodon-poc.vercel.app/spread_mastodon_share.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Logo />
      <div>
        <main className="l-main c-page__interior">
          {success ? (
            <div>
              <Grid className="c-grid__profile-success">
                <GridItem columnStart={1} columnEnd={13}>
                  <Icon iconName="check" width="100" height="100" />
                </GridItem>
                <GridItem columnStart={1} columnEnd={13}>
                  <div className="c-profile-success__content u-text-align--center">
                    <h2 className="c-profile-success__title u-heading--2xl">
                      {dataContent.successHeading.textOne}
                      <br />
                      {user?.data?.username}!
                    </h2>
                    <p className="c-profile-success__sub-title">
                      {dataContent.successSubHeading.text}{' '}
                      <Link
                        className="c-link"
                        href={dataContent.successSubHeading.link.url}>
                        {dataContent.successSubHeading.link.text}
                      </Link>
                      {dataContent.successSubHeading.textTwo}
                    </p>
                  </div>
                </GridItem>
              </Grid>
              <div className="c-profile-success__buttons">
                <Button
                  link={dataContent.successButton.link}
                  text={dataContent.successButton.text}
                />
              </div>
            </div>
          ) : (
            <>
              <StepperHeader
                iconName="join"
                iconWidth="75"
                iconHeight="83"
                heading={dataContent.heading.text}
                subHeading={dataContent.subHeading.text}
              />
              <Grid>
                {!hasAccessToken ? (
                  <GridItem columnStart={5} columnEnd={9}>
                    <Button
                      text="Sign in"
                      loading={loading}
                      className="u-margin-bottom--md"
                      variant="secondary"
                      link="authenticate"
                    />
                  </GridItem>
                ) : (
                  <GridItem columnStart={1} columnEnd={13}>
                    <Grid className="c-profile-box">
                      <GridItem columnStart={1} columnEnd={8}>
                        <div className="c-profile-box__heading u-text-align--center">
                          <h2>Profile Preview</h2>
                        </div>
                      </GridItem>
                      <GridItem columnStart={1} columnEnd={8}>
                        <div className="c-profile-box__card">
                          <div className="c-profile-box__card__background">
                            <img src={backgroundSrc} alt="avatar" />
                          </div>
                          <div className="c-profile-box__card__meta">
                            <Image
                              src={avatarSrc}
                              alt="avatar"
                              width="100"
                              height="100"
                            />
                            <div className="c-profile-box__card__data">
                              <div>
                                {user?.data?.acct && <h4>{user.data.acct}</h4>}
                                {user?.data?.username && (
                                  <span>
                                    @{user.data.username}@mastodon.social
                                  </span>
                                )}
                              </div>
                              <div>
                                <p>{bio}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </GridItem>
                      <GridItem columnStart={8} columnEnd={-1}>
                        <form className="c-profile-box__form">
                          <div className="c-profile-box__avatar">
                            <label
                              className="u-visually-hidden"
                              htmlFor="avatar">
                              {dataContent.uploadAvatarButton.text}
                            </label>
                            <input
                              onChange={(e) => updateAvatar(e)}
                              accept="image/jpeg,image/png,image/gif,image/webp"
                              type="file"
                              name="avatar"
                              id="avatar"
                            />
                            <Button
                              className="c-profile-box__button"
                              text={dataContent.uploadAvatarButton.text}
                              onClick={handleAvatarButtonClick}
                            />
                            {/* <span className="hint">PNG, GIF or JPG. At most 2 MB. Will be downscaled to 1500x500px</span> */}
                          </div>
                          <div className="c-profile-box__background">
                            <label
                              className="u-visually-hidden"
                              htmlFor="background">
                              {dataContent.uploadBackgroundButton.text}
                            </label>
                            <input
                              onChange={(e) => updateBackground(e)}
                              accept="image/jpeg,image/png,image/gif,image/webp"
                              type="file"
                              name="background"
                              id="background"
                            />
                            <Button
                              className="c-profile-box__button"
                              text={dataContent.uploadBackgroundButton.text}
                              onClick={handleBackgroundButtonClick}
                            />
                            {/* <span className="hint">PNG, GIF or JPG. At most 2 MB. Will be downscaled to 1500x500px</span> */}
                          </div>
                          <div>
                            <label
                              className="u-visually-hidden"
                              htmlFor="bio"
                              aria-hidden>
                              Bio
                            </label>
                            <textarea
                              id="bio"
                              type="textArea"
                              placeholder="Add your short bio here..."
                              onKeyDown={(e) => updateBio(e)}
                              {...register('bio')}
                            />
                            {errors.bio && (
                              <span className="c-input-error__message u-margin-bottom--sm u-display--inline-block">
                                {errors.bio.message}
                              </span>
                            )}
                          </div>
                        </form>
                      </GridItem>
                    </Grid>
                    <Grid className="c-profile-box__buttons" variant="autoFit">
                      <Button
                        onClick={handleSubmit(onSubmit)}
                        loading={loading}
                        type="submit"
                        text={dataContent.submitButton.text}
                      />
                      <Button
                        variant="secondary"
                        onClick={() => setSuccess(true)}
                        text={dataContent.skipButton.text}
                      />
                    </Grid>
                  </GridItem>
                )}
              </Grid>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
