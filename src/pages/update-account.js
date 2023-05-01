import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import Button from '@/components//molecules/Button';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import axios from 'axios';

export default function UpdateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const accessToken = sessionStorage.getItem('accessToken');
    setLoading(true);

    try {
      console.log(data.bio);
      const response = await axios.patch('/api/updateAccount', {
        accessToken,
        bio: data.bio,
      });
    } catch (error) {
      console.log(error.response.data);
    }

    setLoading(false);
  };

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
                <Button loading={loading} type="submit" text="Update" />
              </div>
            </form>
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
