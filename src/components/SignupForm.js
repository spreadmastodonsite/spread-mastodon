import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from './molecules/Button';

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

  return (
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
          {...register('verifyPassword', { required: 'Password is required' })}
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
        {!acceptedTerms && <span>Please accept the Terms of Service</span>}
      </div>

      <div>
        <Button loading={loading} type="submit" text="Sign up" />
      </div>
      {responseMessage && <div>{responseMessage}</div>}
    </form>
  );
}
