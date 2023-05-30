import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
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
  // Declare state variables
  const [validationMessage, setValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifiedAndAuthenticated, setVerifiedAndAuthenticated] =
    useState(false);
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const [user, setUser] = useState();
  const [toggleForm, setToggleForm] = useState(false);

  // Authenticate the user with the provided email and password
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
          error.response.data.error.error_description,
        )}`,
      );
    }
  };

  // Verify the user's account with the provided access token
  const verifyUserAccount = async (accessToken) => {
    try {
      const response = await axios.get(
        `/api/verifyAccount?accessToken=${accessToken}`,
      );
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

  // Handle form submission success
  const handleSubmitSuccess = async (accessToken) => {
    // Store the access token in session storage
    sessionStorage.setItem('accessToken', accessToken);
    // Set the validation message and authenticated state
    setValidationMessage(
      'Verified and authenticated successfully if you do not advance to the next page please click the button below',
    );
    setVerifiedAndAuthenticated(true);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const accessToken = await authenticateUser(data.email, data.password);
      await verifyUserAccount(accessToken);

      // Call the handle submit success function
      handleSubmitSuccess(accessToken);
    } catch (error) {
      setValidationMessage(error.message);
    }

    setLoading(false);
  };

  const onAuthSubmit = async (data) => {
    console.log(data);
    const redirectUrl = 'https://join-mastodon-poc.vercel.app/enhance-account';
    try {
      const response = await axios.post('/api/authapp', {
        response_type: 'code',
        client_id: data.server,
        redirect_uri: redirectUrl,
      });

      console.log(response);
      window.location.href = response.data.data;
      return response;
    } catch (error) {
      console.log(error);
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
    <div className="content-wrapper c-page__join">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
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
                {data.authHeader.text}{' '}
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: data.authSubHeading.text }}
              />
              {toggleForm ? (
                <form
                  className="c-authenticate-form"
                  onSubmit={handleSubmit(onAuthSubmit)}>
                  <Grid className="c-grid__signup-form">
                    <GridItem columnStart={2} columnEnd={12}>
                      <span className="input-group-text">https://</span>
                      <input
                        required=""
                        id="server"
                        type="text"
                        className="form-control"
                        placeholder="mastodon.social"
                        {...register('server', {
                          required: 'Server is required',
                        })}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="submit"
                        id="sign-in">
                        Sign in
                      </button>
                      {/* <label className="u-visually-hidden" htmlFor="email">
                        Email:
                      </label>
                      {errors.email && (
                        <span className="u-margin-bottom--sm u-display--inline-block">
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
                      /> */}
                    </GridItem>
                    <GridItem columnStart={2} columnEnd={12}>
                      <div>
                        <p>
                          Still need to authenticate{' '}
                          <span onClick={() => setToggleForm(false)}>
                            Click here
                          </span>
                        </p>
                      </div>
                    </GridItem>
                  </Grid>
                </form>
              ) : (
                <form
                  className="c-authenticate-form"
                  onSubmit={handleSubmit(onSubmit)}>
                  <Grid className="c-grid__signup-form">
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
                    <GridItem columnStart={2} columnEnd={12}>
                      <div>
                        <p>
                          Already have an account{' '}
                          <span onClick={() => setToggleForm(true)}>
                            Click here
                          </span>
                        </p>
                      </div>
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
              )}
            </div>
          )}
        </Grid>
      </main>
    </div>
  );
}
