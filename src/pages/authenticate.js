import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Button from '@/components/molecules/Button';

import { authenticateData as data } from '../../data/authenticate';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Icon from '@/components/atoms/icon';

export default function AuthenticateUser() {
  const router = useRouter();

  // Declare state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifiedAndAuthenticated, setVerifiedAndAuthenticated] =
    useState(false);
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const [user, setUser] = useState();

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
    // Redirect to the follow suggestions page
    router.push('/follow-suggestions');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accessToken = await authenticateUser(email, password);
      await verifyUserAccount(accessToken);

      // Call the handle submit success function
      handleSubmitSuccess(accessToken);
    } catch (error) {
      setValidationMessage(error.message);
    }

    setLoading(false);
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
    <div>
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <GridItem columnStart={2} columnEnd={7}>
            {verifiedAndAuthenticated || storedAccessToken ? (
              // If already authenticated, display appropriate message
              <>
                {validationMessage && <div>{validationMessage}</div>}
                <Button link="/follow-suggestions" text={data.profile.text} />
              </>
            ) : (
              // If not authenticated, display login form
              <>
                <h1>{data.heading.text} </h1>
                <p>{data.subHeading.text}</p>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password:</label>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    // Shows the validation message if there the page doesn't redirect
                    <p>
                      {validationMessage && <div>{validationMessage}</div>}
                      <Button type="submit" text="Log in &amp; Authenticate" />
                    </p>
                  )}
                </form>
              </>
            )}
          </GridItem>
          <GridItem columnStart={7} columnEnd={12}>
            <Button variant="secondary" link="/" text={data.skip.text} />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
