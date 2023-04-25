import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from './molecules/Button';
import Grid from './layout/Grid';
import GridItem from './layout/GridItem';

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [responseMessage, setResponseMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const username = watch('username', '');
  const displayName = watch('displayName', '');
  const password = watch('password', '');
  const verifyPassword = watch('verifyPassword', '');
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (!acceptedTerms) {
      setResponseMessage('Error: Please accept the Terms of Service');
      return;
    }

    if (password !== verifyPassword) {
      setResponseMessage('Error: Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        ...data,
        agreement: acceptedTerms,
      });

      setAccountCreated(true);
      setResponseMessage(`Account created successfully`);
      router.push('/authenticate');
    } catch (error) {
      setResponseMessage(
        `Error: ${JSON.stringify(error.response.data.error.error)}`,
      );
    }

    setLoading(false);
  };

  const checkPasswordsMatch = () => {
    if (password !== verifyPassword) {
      return <span>Passwords do not match</span>;
    }
  };

  return accountCreated ? (
    <div className="u-text-align--center">
      <h2>
        Confirmed: Welcome to <br /> Mastodon,{' '}
        {displayName ? displayName : username}!
      </h2>
      <p>You are in! So What’s Next?</p>
      <Grid variant="autofit">
        <GridItem columnStart={4} columnEnd={7}>
          <Button link="/enhance-account" text="Enhance Your Account Now!" />
        </GridItem>
        <GridItem columnStart={7} columnEnd={10}>
          <Button link="/" text="Help Your Friends Find you on Mastodon" />
        </GridItem>
      </Grid>
    </div>
  ) : (
    <div>
      <p className="u-text-align--center">
        Join the Whole Mastodon Network via this Trusted Community Server
      </p>
      <Grid>
        <GridItem columnStart={5} columnEnd={9}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
              <label htmlFor="displayName">Display Name:</label>
              <input
                id="displayName"
                type="text"
                {...register('displayName')}
              />
              {errors.displayName && <span>{errors.displayName.message}</span>}
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <span>{errors.username.message}</span>}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div>
              <label htmlFor="verifyPassword">Verify Password:</label>
              <input
                id="verifyPassword"
                type="password"
                {...register('verifyPassword', {
                  required: 'Password is required',
                })}
              />
              {checkPasswordsMatch()}
            </div>

            <div className="c-agreement">
              <label htmlFor="agreement">
                <input
                  id="agreement"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                />
                I accept the Terms of Service
              </label>
              {!acceptedTerms && (
                <span>Please accept the Terms of Service</span>
              )}
            </div>

            <div>
              <Button loading={loading} type="submit" text="Sign up" />
            </div>
            {responseMessage && <div>{responseMessage}</div>}
          </form>
        </GridItem>
      </Grid>
    </div>
  );
}
