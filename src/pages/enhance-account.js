import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Add this import statement
import Head from 'next/head';
import Card from '@/components/Organism/Card';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import AnimatedHeader from '@/components/molecules/animatedHeader';
import Logo from '@/components/atoms/Logo';
import { EnhanceAccount as data } from '/data/enhanceAccount.js';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/router';

export default function Join() {
  const router = useRouter();
  const heading = data.heading;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [validationMessage, setValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [verifiedAndAuthenticated, setVerifiedAndAuthenticated] =
    useState(false);
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const [storedServerName, setStoredServerName] = useState('');

  // Handle form submission success
  const handleSubmitSuccess = async (accessToken) => {
    sessionStorage.setItem('accessToken', accessToken);
    setValidationMessage(
      'Verified and authenticated successfully if you do not advance to the next page please click the button below',
    );
    setVerifiedAndAuthenticated(true);
  };

  const verifyUserAccount = async (accessToken) => {
    try {
      const response = await axios.post(`/api/verifyAccount`, { accessToken });
      console.log('🔥 verifyUserAccount response', response);
      setUser(response.data.data.acct);
      // return response.data;
    } catch (error) {
      throw new Error(
        `Error verifying account: ${JSON.stringify(
          error.response.data.error.error
        )}`
      );
    }
  };

  const authenticateUser = async (email, password) => {
    try {
      const response = await axios.post('/api/authenticate', {
        email,
        password,
      });
      return response.data.data.access_token;
    } catch (error) {
      throw new Error(
        `Error authenticating account: ${JSON.stringify(
          error.response.data.error.error_description
        )}`
      );
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const accessToken = await authenticateUser(data.email, data.password);
      await verifyUserAccount(accessToken);
      handleSubmitSuccess(accessToken);
    } catch (error) {
      setValidationMessage(error.message);
    }

    setLoading(false);
  };

  // Handle auth submit
  const onAuthSubmit = async (data) => {
    const serverName = data.server;
    window.localStorage.setItem('client', serverName);

    const redirectUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/enhance-callback'
        : 'https://join-mastodon-poc.vercel.app/enhance-callback';

    try {
      const response = await axios.post(
        '/api/createAuthUrl',
        {
          response_type: 'code',
          serverName: serverName,
          redirectUri: redirectUrl,
          scope: 'read write follow',
        },

        onSubmit(data),
      );

      window.localStorage.setItem('m_sec', response.data.client_secret);
      window.localStorage.setItem('m_id', response.data.client_id);

      // Redirect to the authorization url
      window.location.href = response.data.authorizationUrl;
    } catch (error) {
      throw new Error(
        `Error authenticating account: ${JSON.stringify(
          error.response ? error.response.data : error.message,
        )}`,
      );
    }
  };

  useEffect(() => {
    const serverName = window.localStorage.getItem('client');

    if (serverName) {
      setStoredServerName(serverName);
    }
  }, []);

  return (
    <div className="content-wrapper c-page__join">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <meta property="og:title" content={data.metaData.name} />
        <meta property="og:description" content={data.metaData.description} />
        <meta property="og:url" content={router.pathname} />
        <meta name="twitter:title" content={data.metaData.name} />
        <meta name="twitter:description" content={data.metaData.description} />
      </Head>

      <main className="l-main">
        <Grid className="u-text-align--center">
          <GridItem columnStart={1} columnEnd={13}>
            <Logo variant="large" />
            <AnimatedHeader
              className="u-heading--3xl"
              textOne={heading.textOne}
              textRotate={heading.textRotate}
              rotateLocation="newline"
            />
          </GridItem>
        </Grid>

        <Grid variant="autoFit" className="c-card__container">
          {verifiedAndAuthenticated || storedAccessToken ? (
            data.cards.map((card) => (
              <Card
                key={card.title}
                title={card.title}
                iconName={card.icon}
                iconWidth={card.iconWidth}
                iconHeight={card.iconHeight}
                link={card.link}
                linkText={card.linkText}
                variant="large"
              />
            ))
          ) : (
            <div className="c-enhance__auth">
              <h2 className="c-signup-success__sub-title u-text-align--center">
                {data.authHeader.text}
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: data.authSubHeading.text }}
              />
              <form
                className="c-authenticate-form"
                onSubmit={handleSubmit(onAuthSubmit)}>
                <Grid className="c-grid__signup-form">
                  {!storedServerName && (
                    <GridItem columnStart={2} columnEnd={12}>
                      <label className="u-visually-hidden" htmlFor="server">
                        Server:
                      </label>
                      {errors.server && (
                        <span className="c-input-error__message u-margin-bottom--sm u-display--inline-block">
                          {errors.server.message}
                        </span>
                      )}
                      <input
                        required=""
                        id="server"
                        type="text"
                        className="c-signup-form__input"
                        placeholder="mastodon.social"
                        {...register('server', {
                          required: 'Server is required',
                        })}
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(
                            /^https?:\/\//i,
                            '',
                          );
                        }}
                      />
                      <span className="c-field-note">
                        Server name. Example: mastodon.social
                      </span>
                    </GridItem>
                  )}
                  <GridItem columnStart={2} columnEnd={12}>
                    <label className="u-visually-hidden" htmlFor="email">
                      Email:
                    </label>
                    {errors.email && (
                      <span className="c-input-error__message u-margin-bottom--sm u-display--inline-block">
                        {errors.email.message}
                      </span>
                    )}
                    <input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      className={`c-signup-form__input ${
                        errors.email && 'c-signup-form__input--error'
                      }`}
                      {...register('email', {
                        required: 'Email is required',
                      })}
                    />
                  </GridItem>
                  <GridItem columnStart={2} columnEnd={12}>
                    <label className="u-visually-hidden" htmlFor="password">
                      Password:
                    </label>
                    {errors.password && (
                      <span className="c-input-error__message u-margin-bottom--sm u-display--inline-block">
                        {errors.password.message}
                      </span>
                    )}
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className={`c-signup-form__input ${
                        errors.password && 'c-signup-form__input--error'
                      }`}
                      {...register('password', {
                        required: 'Password is required',
                      })}
                    />
                  </GridItem>
                </Grid>
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
                        text={data.submitButton.text}
                      />
                    </GridItem>
                  </Grid>
                )}
              </form>
            </div>
          )}
        </Grid>
      </main>
    </div>
  );
}
