import { useState } from 'react';
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
        <Grid className="u-text-align--center">
          <GridItem columnStart={4} columnEnd={10}>
            <h1>Adding Your Profile Picture and Bio</h1>
            <p>
              Now that you have an account, you can add a profile picture and
              bio to your account.
            </p>
          </GridItem>
          <GridItem columnStart={4} columnEnd={10}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="bio">Bio:</label>
                <input id="bio" type="textArea" {...register('bio')} />
                {errors.bio && <span>{errors.bio.message}</span>}
              </div>
              <div>
                <input
                  onChange={(e) => updateAvatar(e)}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  type="file"
                  name="avatar"
                  id="avatar"
                />  
                <span className="hint">PNG, GIF or JPG. At most 2 MB. Will be downscaled to 1500x500px</span>
                <Image
                  src={avatarSrc}
                  alt="avatar"
                  width="200"
                  height="200"
                />
              </div>
              <div>
                <input
                  onChange={(e) => updateBackground(e)}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  type="file"
                  name="background"
                  id="backgroumd"
                />  
                <span className="hint">PNG, GIF or JPG. At most 2 MB. Will be downscaled to 1500x500px</span>
                <Image
                  src={backgroundSrc}
                  alt="avatar"
                  width="200"
                  height="200"
                />
              </div>
              <div>
                <Button loading={loading} type="submit" text="Update" />
              </div>
            </form>
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
