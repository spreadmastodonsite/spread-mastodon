import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import cx from 'classnames';
import Button from './molecules/Button';
import Grid from './layout/Grid';
import GridItem from './layout/GridItem';

import { signUpData as data } from '/data/signUp.js';
import StepperHeader from '@/components/molecules/StepperHeader';
import Icon from './atoms/icon';

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
  const confirmPassword = watch('confirmPassword', '');
  const [loading, setLoading] = useState(false);

  const componentClassName = cx('c-signup-form', {
    [`c-signup-form--success`]: accountCreated,
  });

  const handleCheckboxChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (!acceptedTerms) {
      setResponseMessage('Error: Please accept the Terms of Service');
      return;
    }

    if (password !== confirmPassword) {
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
    } catch (error) {
      setResponseMessage(
        `Error: ${JSON.stringify(error.response.data.error.error)}`,
      );
    }

    setLoading(false);
  };

  const checkPasswordsMatch = () => {
    if (password !== confirmPassword) {
      return <span>Passwords do not match</span>;
    }
  };

  return accountCreated ? (
    <div className={`${componentClassName}, `}>
      <Grid className="c-grid__signup-success">
        <GridItem columnStart={1} columnEnd={13}>
          <Icon iconName="check" width="100" height="100" />
        </GridItem>
        <GridItem columnStart={1} columnEnd={13}>
          <div className="c-signup-success__content u-text-align--center">
            <h2 className="c-signup-success__title u-heading--2xl">
              {data.successHeading.textOne}
              <br /> {data.successHeading.textTwo}{' '}
              {displayName ? displayName : username}!
            </h2>
            <p className="c-signup-success__sub-title">
              {data.successSubHeading.text}
            </p>
          </div>
        </GridItem>
      </Grid>
      <Grid className="c-signup-success__buttons" variant="autoFit">
        {/* <Button link="/update-account" text="Add Your Profile Basics!" /> */}
        <Button
          link={data.successButtonTwo.link}
          text={data.successButtonTwo.text}
        />
        <Button
          variant="secondary"
          link={data.successButtonOne.link}
          text={data.successButtonOne.text}
        />
      </Grid>
    </div>
  ) : (
    <>
      <StepperHeader
        iconName="join"
        iconWidth="75"
        iconHeight="83"
        heading={data.heading.text}
        subHeading={data.subHeading.text}
      />
      <div className={componentClassName}>
        <p className="u-heading--lg u-text-align--center">
          {data.description.text}
        </p>
        <form
          className="c-form c-form__signup"
          onSubmit={handleSubmit(onSubmit)}>
          <Grid className="c-grid__signup-form">
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className={`c-signup-form__input ${
                  errors.email && 'c-signup-form__input--error'
                } `}
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" htmlFor="displayName">
                Display Name:
              </label>
              <input
                id="displayName"
                type="text"
                placeholder="Display Name"
                className={`c-signup-form__input ${
                  errors.displayName && 'c-signup-form__input--error'
                } `}
                {...register('displayName')}
              />
              {errors.displayName && <span>{errors.displayName.message}</span>}
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" htmlFor="username">
                Username:
              </label>
              <input
                id="username"
                type="text"
                placeholder="username@mastodon.social"
                className={`c-signup-form__input ${
                  errors.username && 'c-signup-form__input--error'
                } `}
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <span>{errors.username.message}</span>}
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" hidden htmlFor="password">
                Password:
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className={`c-signup-form__input ${
                  errors.password && 'c-signup-form__input--error'
                } `}
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" htmlFor="confirmPassword">
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: 'Password is required',
                })}
                className={`c-signup-form__input ${
                  errors.confirmPassword && 'c-signup-form__input--error'
                } `}
              />
              {checkPasswordsMatch()}
            </GridItem>

            <GridItem columnStart={4} columnEnd={11}>
              <div className="c-agreement">
                <label htmlFor="agreement">
                  <input
                    id="agreement"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                  />
                  I have read and agree with the community server rules and
                  privacy policies.
                </label>
                {!acceptedTerms && (
                  <span>Please accept the Terms of Service</span>
                )}
              </div>
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <Button
                loading={loading}
                type="submit"
                text={data.formButton.text}
              />
              {responseMessage && <div>{responseMessage}</div>}
            </GridItem>
          </Grid>
        </form>
      </div>
    </>
  );
}
