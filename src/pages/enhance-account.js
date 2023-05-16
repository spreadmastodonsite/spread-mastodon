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

export default function Join() {
  const heading = data.heading;

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
    <div className="content-wrapper c-page__join">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href={data.metaData.icon} />
      </Head>

      <main className="l-main">
        <Grid className="u-text-align--center">
          <GridItem columnStart={1} columnEnd={13}>
            <Logo />
            <AnimatedHeader
              className="u-heading--3xl"
              textOne={heading.textOne}
              textRotate={heading.textRotate}
              rotateLocation="newline"
            />
          </GridItem>

          {/* <p className="u-body--lg">{data.subHeading.text}</p> */}
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
              <p className="u-body--lg u-text-align--center">
                {data.authSubHeading.text}
              </p>
              <form className="c-authenticate-form" onSubmit={handleSubmit}>
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
                  <>
                    {validationMessage && <div>{validationMessage}</div>}
                    <Button
                      className="c-button__auth"
                      type="submit"
                      text="Log in &amp; Authenticate"
                    />
                  </>
                )}
              </form>
            </div>
          )}
        </Grid>
      </main>
    </div>
  );
}
