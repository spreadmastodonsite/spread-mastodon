import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Card from '@/components/Organism/Card';
import Spinner from '@/components/atoms/Loader';
import { EnhanceAccount as data } from '/data/enhanceAccount.js';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Logo from '@/components/atoms/Logo';

const EnhanceAuth = () => {
  const router = useRouter();
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const [user, setUser] = useState();
  const { code } = router.query;

  const getToken = async () => {
    try {
      const m_sec = window.localStorage.getItem('m_sec');
      const m_id = window.localStorage.getItem('m_id');
      const server_name = window.localStorage.getItem('client');
      const res = await axios.post('/api/getToken', {
        code,
        m_sec,
        m_id,
        server_name,
      });
      setStoredAccessToken(res.data.access_token);
    } catch (error) {
      console.log('Error getToken: ', error);
    }
  };

  const verifyUserAccount = async (token) => {
    try {
      const server_name = window.localStorage.getItem('client');
      const res = await axios.post(`/api/verifyUserAccount`, {
        token,
        server_name,
      });
      setUser(res.data);
    } catch (error) {
      console.log('Error verifyUserAccount: ', error.response.data);
    }
  };

  useEffect(() => {
    if (code) {
      getToken();
    } else {
      console.log('No code found');
    }
  }, [code]);

  useEffect(() => {
    if (storedAccessToken) {
      verifyUserAccount(storedAccessToken);
    }
  }, [storedAccessToken]);

  return (
    <main className='l-main'>
      <Grid className='u-text-align--center'>
        <GridItem columnStart={1} columnEnd={13}>
          <Logo variant='large' />
        </GridItem>
      </Grid>

      {user ? (
        <div>
          <div className='u-text-align--center u-margin-top--lg'>
            <h3>{user.username}</h3>
            <h3>{user.url}</h3>
          </div>

          <Grid variant='autoFit' className='c-card__container'>
            {data.cards.map((card) => (
              <Card
                key={card.title}
                title={card.title}
                iconName={card.icon}
                iconWidth={card.iconWidth}
                iconHeight={card.iconHeight}
                link={card.link}
                linkText={card.linkText}
                variant='large'
              />
            ))}
          </Grid>
          <Spinner />
        </div>
      ) : (
        <div className='u-text-align--center u-margin-top--lg'>
          <Spinner />
        </div>
      )}
    </main>
  );
};

export default EnhanceAuth;
