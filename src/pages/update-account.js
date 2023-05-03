import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import Button from '@/components//molecules/Button';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import StepperHeader from '@/components/molecules/StepperHeader';
import Image from 'next/image';
import axios from 'axios';

export default function UpdateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState('/missing.png');
  const [base64, setbase64] = useState('');
  const [backgroundSrc, setBackgroundSrc] = useState('/default-bg.png');
  const [BgBase64, setBgBase64] = useState('');
  const [user, setUser] = useState();
  const [bio, setBio] = useState('Add your short bio here...');

  const updateBio = (event) => {
    setBio(event.target.value);
  };

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
    setTimeout(() => {
      getAccount();
    }, 500);
  }, []);

  return (
    <>
      <Head>
        <title>Mastodon Update Account</title>
        <meta
          name="description"
          content="Mastodon account signup using Next.js, React and Mastodon API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img
        src="/-e-SpreadMastodon_Logo.png"
        alt="Spread Mastodon | Take Back Social"
        className="c-logo"
      />

      <div>
        <main className="l-main c-page__interior">
          {success ? (
            <div>
              <p>success</p>
            </div>
          ) : (
            <>
              <StepperHeader
                iconName="join"
                iconWidth="75"
                iconHeight="83"
                heading={'Adding Your Profile Picture and Bio'}
                subHeading={'(Step 2 of 2; Optional But Recommended)'}
              />
              <Grid>
                <GridItem
                  columnStart={4}
                  columnEnd={10}
                  className="u-text-align--center">
                  <h1></h1>
                  <p></p>
                </GridItem>
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
                          <label className="u-visually-hidden" for="avatar">
                            Upload Your Avatar
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
                            text={'Upload Your Avatar'}
                            onClick={handleAvatarButtonClick}
                          />
                          {/* <span className="hint">PNG, GIF or JPG. At most 2 MB. Will be downscaled to 1500x500px</span> */}
                        </div>
                        <div className="c-profile-box__background">
                          <label className="u-visually-hidden" for="background">
                            Upload Your Background Image
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
                            text={'Upload Your Background Image'}
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
                          {errors.bio && <span>{errors.bio.message}</span>}
                        </div>
                      </form>
                    </GridItem>
                  </Grid>
                  <Grid className="c-profile-box__buttons" variant="autoFit">
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      loading={loading}
                      type="submit"
                      text="Save and update your profile"
                    />
                    <Button
                      variant="secondary"
                      link="/follow-tags"
                      text="Skip This Step For Now"
                    />
                  </Grid>
                </GridItem>
              </Grid>
            </>
          )}
        </main>
      </div>
    </>
  );
}
