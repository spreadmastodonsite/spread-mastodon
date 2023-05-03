import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import Button from '@/components//molecules/Button';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
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
  const [avatarSrc, setAvatarSrc] = useState('/missing.png');
  const [base64, setbase64] = useState('');
  const [backgroundSrc, setBackgroundSrc] = useState('/default-bg.png');
  const [BgBase64, setBgBase64] = useState('');
  const [user, setUser] = useState();
  const [bio, setBio] = useState('Add your short bio here...');

  const updateBio = (event) => {
    setBio(event.target.value);
  }

  
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
  }

  const onSubmit = async (data) => {
    const accessToken = sessionStorage.getItem('accessToken');
    setLoading(true);

    try {
      const response = await axios.patch('/api/updateAccount', {
        accessToken,
        bio: data.bio,
        avatar: base64,
        header: BgBase64
      });
    } catch (error) {
    }

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
    setAvatarSrc(URL.createObjectURL(event.target.files[0]))
    getBase64(event.target.files[0])
  }

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
    setBackgroundSrc(URL.createObjectURL(event.target.files[0]))
    getBgBase64(event.target.files[0])
  }

  useEffect(() => {
    setTimeout(() => {
      getAccount();
    }, 500);
  }, []);


  return (
    <div>
      <Head>
        <title>Mastodon Update Account</title>
        <meta
          name="description"
          content="Mastodon account signup using Next.js, React and Mastodon API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="l-main">
        <Grid>
          <GridItem columnStart={4} columnEnd={10} className="u-text-align--center">
            <h1>Adding Your Profile Picture and Bio</h1>
            <p>
              Now that you have an account, you can add a profile picture and
              bio to your account.
            </p>
          </GridItem>
          <GridItem columnStart={2} columnEnd={12}>
            <Grid className="c-profile-box">
              <GridItem columnStart={2} columnEnd={7}>
                <div className="c-profile-box__heading u-text-align--center">
                  <h2>Profile Preview</h2>
                </div>
              </GridItem>
              <GridItem columnStart={2} columnEnd={7}>
                <div className="c-profile-box__card">
                  <div className="c-profile-box__card__background">
                    <img
                      src={backgroundSrc}
                      alt="avatar"
                    />
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
                        {user?.data?.username && <span>{user.data.username}</span>}
                      </div>
                      <div>
                        <p>{bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GridItem>
              <GridItem columnStart={8} columnEnd={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="c-profile-box__avatar">
                    <label for="avatar">Upload Your Avatar</label>
                    <input
                      onChange={(e) => updateAvatar(e)}
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      type="file"
                      name="avatar"
                      id="avatar"
                    />  
                    {/* <span className="hint">PNG, GIF or JPG. At most 2 MB. Will be downscaled to 1500x500px</span> */}
                  </div>
                  <div className="c-profile-box__background">
                    <label for="background">Upload Your Background Image</label>
                    <input
                      onChange={(e) => updateBackground(e)}
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      type="file"
                      name="background"
                      id="backgroumd"
                    />  
                    {/* <span className="hint">PNG, GIF or JPG. At most 2 MB. Will be downscaled to 1500x500px</span> */}
                  </div>
                  <div>
                    <label htmlFor="bio" aria-hidden>Bio</label>
                    <textarea
                      id="bio"
                      type="textArea"
                      placeholder="Add your short bio here..."
                      onKeyDown={(e) => updateBio(e)}
                      {...register('bio')}
                    />
                    {errors.bio && <span>{errors.bio.message}</span>}
                  </div>
                  <div>
                    <Button loading={loading} type="submit" text="Update" />
                  </div>
                </form>
                </GridItem>
              </Grid>
              <Grid>
                <GridItem columnStart={2} columnEnd={6}>
                  
                </GridItem>
                <GridItem columnStart={7} columnEnd={12}>
                  <div>
                    <Button href="/follow-tags" text="Skip This Step For Now" />
                  </div>
                </GridItem>
              </Grid>
            </GridItem>
        </Grid>
      </main>
    </div>
  );
}
