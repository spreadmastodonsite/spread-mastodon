import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function authenticateUser() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [validatedEmail, setValidatedEmail] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/authenticate', {
        email,
        password,
      });

      // Store the access token for future authenticated requests
      sessionStorage.setItem('accessToken', response.data.data.access_token);

      setValidationMessage('Authenticated successfully');
    } catch (error) {
      setValidationMessage(`Error: ${JSON.stringify(error.response.data)}`);
    }
  };

  return (
    <div>
      <h1>Authenticate</h1>
      <p>
        Please check your email and click the confirmation link. Once confirmed,
        click the button below and log in to authenticate and view suggested
        users to follow.
      </p>
      <button onClick={() => setValidatedEmail(true)}>
        I have validated my email, proceed
      </button>
      {validatedEmail && (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              onClick={() => router.push('/follow-suggestions')}
              type="submit">
              Log in &amp; Authenticate
            </button>
          </form>
          {validationMessage && <div>{validationMessage}</div>}
        </>
      )}
    </div>
  );
}
