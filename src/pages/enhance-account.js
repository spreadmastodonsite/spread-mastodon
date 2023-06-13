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
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const [storedServerName, setStoredServerName] = useState('');

  const onAuthSubmit = async (data) => {
    const serverName = data.server;
    window.localStorage.setItem('client', serverName);

    const redirectUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/enhance-callback'
        : 'https://spreadmastodon.org/enhance-callback';

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

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('accessToken');

    if (sessionToken) {
      setStoredAccessToken(sessionToken);
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
          {storedAccessToken ? (
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
              {data.headingTwo && (
                <h2 className="c-signup-success__sub-title u-text-align--center">
                  {data.headingTwo.text}
                </h2>
              )}
              {data.subHeadingTwo && (
                <div
                  dangerouslySetInnerHTML={{ __html: data.subHeadingTwo.text }}
                />
              )}
              {data.headingThree && (
                <h2 className="c-signup-success__sub-title u-text-align--center u-margin-top--xl">
                  {data.headingThree.text}
                </h2>
              )}
              {data.subHeadingThree && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.subHeadingThree.text,
                  }}
                />
              )}
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
                          <p className="c-success u-margin-top--lg u-body--copy">
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
