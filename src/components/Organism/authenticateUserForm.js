import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '@/components/atoms/Button';

import { authenticateData as data } from '../../../data/authenticate';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';

export default function AuthenticateUserForm() {
  const router = useRouter();

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
          error.response.data.error.error_description
        )}`
      );
    }
  };

  // Verify the user's account with the provided access token
  const verifyUserAccount = async (accessToken) => {
    try {
      const response = await axios.post(`/api/verifyAccount`, { accessToken });

      console.log('🔥 response', response);

      setUser(response.data.data.acct);
      return response.data;
    } catch (error) {
      throw new Error(
        `Error verifying account: ${JSON.stringify(
          error.response.data.error.error
        )}`
      );
    }
  };

  // Handle form submission success
  const handleSubmitSuccess = async (accessToken) => {
    // Store the access token in session storage
    sessionStorage.setItem('accessToken', accessToken);
    // Set the validation message and authenticated state
    setValidationMessage(
      'Verified and authenticated successfully if you do not advance to the next page please click the button below'
    );
    setVerifiedAndAuthenticated(true);
    // Redirect to the follow suggestions page
    router.push('/update-account');
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

  // Get the access token from session storage on component mount
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      setStoredAccessToken(accessToken);
      verifyUserAccount(accessToken);
    }
  }, []);

  return (
    <Grid className='c-grid__signup-success'>
      <GridItem columnStart={3} columnEnd={11}>
        {verifiedAndAuthenticated || storedAccessToken ? (
          // If already authenticated, display appropriate message
          <>
            {validationMessage && <div>{validationMessage}</div>}
            <p className='u-margin-bottom--2xl u-text-align--center u-body--lg'>
              You are already authenticated as {user}. Please click a button
              below to continue.
            </p>
          </>
        ) : (
          // If not authenticated, display login form
          <>
            <h2 className='c-signup-success__sub-title u-text-align--center'>
              {data.heading.text}{' '}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: data.subHeading.text }} />
            <form
              className='c-authenticate-form'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid className='c-grid__signup-form'>
                <GridItem columnStart={2} columnEnd={12}>
                  <label className='u-visually-hidden' htmlFor='email'>
                    Email:
                  </label>
                  {errors.email && (
                    <span className='c-input-error__message u-margin-bottom--sm u-display--inline-block'>
                      {errors.email.message}
                    </span>
                  )}
                  <input
                    id='email'
                    type='email'
                    placeholder='Email Address'
                    className={`c-signup-form__input ${
                      errors.email && 'c-signup-form__input--error'
                    }`}
                    {...register('email', {
                      required: 'Email is required',
                    })}
                  />
                </GridItem>
                <GridItem columnStart={2} columnEnd={12}>
                  <label className='u-visually-hidden' htmlFor='password'>
                    Password:
                  </label>
                  {errors.password && (
                    <span className='c-input-error__message u-margin-bottom--sm u-display--inline-block'>
                      {errors.password.message}
                    </span>
                  )}
                  <input
                    id='password'
                    type='password'
                    placeholder='Password'
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
                <div>Loading...</div>
              ) : (
                // Shows the validation message if there the page doesn't redirect
                <Grid>
                  <GridItem columnStart={2} columnEnd={12}>
                    {validationMessage && <div>{validationMessage}</div>}
                    <Button
                      className='c-button__auth'
                      type='submit'
                      text={data.logInButton.text}
                    />
                  </GridItem>
                </Grid>
              )}
            </form>
          </>
        )}
      </GridItem>
    </Grid>
  );
}
