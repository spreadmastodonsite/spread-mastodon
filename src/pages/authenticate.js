import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Button from '@/components/atoms/Button';

import { authenticateData as data } from '../../data/authenticate';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Icon from '@/components/atoms/icon';
import Logo from '@/components/atoms/Logo';

export default function AuthenticateUser() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [validationMessage, setValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifiedAndAuthenticated, setVerifiedAndAuthenticated] =
    useState(false);
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const [user, setUser] = useState();

  // Verify the user's account with the provided access token
  const verifyUserAccount = async (accessToken) => {
    try {
      const response = await axios.post('/api/verifyAccount', {
        accessToken,
      });
      setUser(response.data.data.acct);
      return response.data;
    } catch (error) {
      throw new Error(
        `Error verifying account: ${JSON.stringify(
          error.response.data.error.error,
        )}`,
      );
    }
  };

  const onAuthSubmit = async (data) => {
    const serverName = 'mastodon.social';
    window.localStorage.setItem('client', serverName);

    const redirectUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/authenticate-callback'
        : 'https://spreadmastodon.org/authenticate-callback';

    try {
      const response = await axios.post('/api/createAuthUrl', {
        response_type: 'code',
        serverName: serverName,
        redirectUri: redirectUrl,
      });
      window.localStorage.setItem('m_sec', response.data.client_secret);
      window.localStorage.setItem('m_id', response.data.client_id);
      window.location.href = response.data.authorizationUrl;
    } catch (error) {
      throw new Error(
        `Error authenticating account: ${JSON.stringify(
          error.response ? error.response.data : error.message,
        )}`,
      );
    }
  };

  // Get the access token from session storage on component mount
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      setStoredAccessToken(accessToken);
      verifyUserAccount(accessToken);
    }
  }, []);

  return (
    <div className="content-wrapper">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <meta property="og:title" content={data.metaData.name} />
        <meta property="og:description" content={data.metaData.description} />
        <meta property="og:url" content={router.pathname} />
        <meta name="twitter:title" content={data.metaData.name} />
        <meta name="twitter:description" content={data.metaData.description} />
      </Head>
      <Logo />
      <main className="l-main c-page__interior">
        <Grid className="c-grid__signup-success">
          <GridItem columnStart={1} columnEnd={13}>
            <Icon iconName="check" width="100" height="100" />
          </GridItem>
          <GridItem columnStart={1} columnEnd={13}>
            <div className="c-signup-success__content u-text-align--center">
              <h2 className="c-signup-success__title u-heading--2xl">
                {data.confirmed.text}
                <br />
                {data.welcome.text}
                {user}
              </h2>
              <p className="c-signup-success__sub-title">{data.next.text}</p>
            </div>
          </GridItem>
        </Grid>
        <Grid className="c-grid__signup-success">
          <GridItem columnStart={3} columnEnd={11}>
            {verifiedAndAuthenticated || storedAccessToken ? (
              // If already authenticated, display appropriate message
              <>
                {validationMessage && <p>{validationMessage}</p>}
                <p className="u-margin-bottom--2xl u-text-align--center u-body--lg">
                  You are already authenticated as {user}. Please click a button
                  below to continue.
                </p>

                <Button link="/update-account" text="Step 1: Update Account" />
              </>
            ) : (
              // If not authenticated, display login form
              <>
                <h2 className="c-signup-success__sub-title u-text-align--center">
                  {data.heading.text}{' '}
                </h2>
                <div
                  dangerouslySetInnerHTML={{ __html: data.subHeading.text }}
                />
                <form
                  className="c-authenticate-form"
                  onSubmit={handleSubmit(onAuthSubmit)}>
                  {loading ? (
                    <Grid>
                      <GridItem columnStart={2} columnEnd={12}>
                        <div>Loading...</div>
                      </GridItem>
                    </Grid>
                  ) : (
                    // Shows the validation message if there the page doesn't redirect
                    <Grid>
                      <GridItem columnStart={2} columnEnd={12}>
                        <div>
                          {validationMessage && (
                            <p className="c-error u-margin-top--lg u-body--copy">
                              {validationMessage}
                            </p>
                          )}
                        </div>
                        <Button
                          className="c-button__auth"
                          type="submit"
                          text="Log in &amp; Authenticate"
                        />
                      </GridItem>
                    </Grid>
                  )}
                </form>
              </>
            )}
          </GridItem>
          <GridItem columnStart={3} columnEnd={11}>
            <Button
              variant="secondary"
              link={data.skip.link}
              text={data.skip.text}
            />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
