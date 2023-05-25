import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '@/components/atoms/Button';

import { authenticateData as data } from '../../../data/authenticate';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';

export default function AuthenticateUserForm() {
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
    router.push('/update-account');
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
    <Grid className="c-grid__signup-success">
      <GridItem columnStart={3} columnEnd={11}>
        {verifiedAndAuthenticated || storedAccessToken ? (
          // If already authenticated, display appropriate message
          <>
            {validationMessage && <div>{validationMessage}</div>}
            <p className="u-margin-bottom--2xl u-text-align--center u-body--lg">
              You are already authenticated as {user}. Please click a button
              below to continue.
            </p>
          </>
        ) : (
          // If not authenticated, display login form
          <>
            <h2 className="c-signup-success__sub-title u-text-align--center">
              {data.heading.text}{' '}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: data.subHeading.text }} />
            {/* <p className="u-body--lg u-text-align--center">
              {data.subHeading.text}
            </p> */}
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
          </>
        )}
      </GridItem>
    </Grid>
  );
}
