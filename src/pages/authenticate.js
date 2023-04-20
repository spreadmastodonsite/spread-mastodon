import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Button from '@/components/molecules/Button';

import { authenticateData as data } from '../../data/authenticate';

export default function AuthenticateUser() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifiedAndAuthenticated, setVerifiedAndAuthenticated] =
    useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
          error.response.data.error.error_description,
        )}`,
      );
    }
  };

  const verifyUserAccount = async (accessToken) => {
    try {
      const response = await axios.get(
        `/api/verifyAccount?accessToken=${accessToken}`,
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Error verifying account: ${JSON.stringify(
          error.response.data.error.error,
        )}`,
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accessToken = await authenticateUser(email, password);
      await verifyUserAccount(accessToken);

      setValidationMessage('Verified and authenticated successfully');
      setVerifiedAndAuthenticated(true);
    } catch (error) {
      setValidationMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {verifiedAndAuthenticated === false ? (
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
                <p>
                  {validationMessage && <div>{validationMessage}</div>}
                  <Button type="submit" text="Log in &amp; Authenticate" />
                </p>
              )}
            </form>
          </>
        ) : (
          <>
            <h1>Authenticated and Verified!</h1>
            <p>View suggested users to follow.</p>
            <Button link="/follow-suggestions" text="Who to Follow" />
          </>
        )}
        <Button link="/" text="Back to Signup" />
      </main>
    </div>
  );
}
