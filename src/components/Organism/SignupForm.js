import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import cx from 'classnames';
import Button from '../atoms/Button';
import Grid from '../layout/Grid';
import GridItem from '../layout/GridItem';

import { signUpData as data } from '/data/signUp.js';
import StepperHeader from '@/components/molecules/StepperHeader';
import Icon from '../atoms/icon';
import AuthenticateUserForm from './authenticateUserForm';

export default function SignupForm() {
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
    setResponseMessage(``);
    if (!acceptedTerms) {
      setResponseMessage('Error: Please accept the Terms of Service');
      return;
    }

    if (password !== confirmPassword) {
      setResponseMessage('Error: Passwords do not match');
      setLoading(false);
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
        `${JSON.stringify(error.response.data.error.error).replace(
          /^Validation failed: /,
          '',
        )}`,
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
      <AuthenticateUserForm />
      <Grid className="c-signup-success__buttons" variant="autoFit">
        <Button
          link={data.successButtonOne.link}
          text={data.successButtonOne.text}
        />
        <Button
          link={data.successButtonTwo.link}
          text={data.successButtonTwo.text}
          variant="secondary"
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
                } `}
                {...register('email', { required: 'Email is required' })}
              />
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" htmlFor="displayName">
                Display Name:
              </label>
              {errors.displayName && (
                <span className="u-margin-bottom--sm u-display--inline-block">
                  {errors.displayName.message}
                </span>
              )}
              <input
                id="displayName"
                type="text"
                placeholder="Display Name"
                className={`c-signup-form__input ${
                  errors.displayName && 'c-signup-form__input--error'
                } `}
                {...register('displayName')}
              />
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" htmlFor="username">
                Username:
              </label>
              {errors.username && (
                <span className="u-margin-bottom--sm u-display--inline-block">
                  {errors.username.message}
                </span>
              )}
              <input
                id="username"
                type="text"
                placeholder="username@mastodon.social"
                className={`c-signup-form__input ${
                  errors.username && 'c-signup-form__input--error'
                } `}
                {...register('username', { required: 'Username is required' })}
              />
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" hidden htmlFor="password">
                Password:
              </label>
              {errors.password && (
                <span className="u-margin-bottom--sm u-display--inline-block">
                  {errors.password.message}
                </span>
              )}
              <input
                id="password"
                type="password"
                placeholder="Password"
                className={`c-signup-form__input ${
                  errors.password && 'c-signup-form__input--error'
                } `}
                {...register('password', { required: 'Password is required' })}
              />
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
              {responseMessage && (
                <p className="u-margin-top--lg u-body--copy">
                  {responseMessage}
                </p>
              )}
            </GridItem>
          </Grid>
        </form>
      </div>
    </>
  );
}
