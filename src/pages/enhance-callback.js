import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Spinner from '@/components/atoms/Loader';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import { useStore } from '@/store/store';

const EnhanceAuth = () => {
  const router = useRouter();
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const { userData, setUserData } = useStore();
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
        url: 'enhance-callback',
      });
      if (res.data.access_token) {
        sessionStorage.setItem('accessToken', res.data.access_token);
        setStoredAccessToken(res.data.access_token);
      }
    } catch (error) {
      new alert('Error getToken: ', error);
    }
  };

  const verifyUserAccount = async (token) => {
    try {
      const server_name = window.localStorage.getItem('client');
      const res = await axios.post(`/api/verifyUserAccount`, {
        token,
        server_name,
      });
      if (res.data) {
        setUserData(res.data);
        router.push('/enhance-account');
      } else {
        new alert('No data from verifyUserAccount');
      }
    } catch (error) {
      new alert('Error verifyUserAccount: ', error.request.data);
    }
  };

  useEffect(() => {
    if (code) {
      getToken();
    }
  }, [code]);

  useEffect(() => {
    if (storedAccessToken) {
      verifyUserAccount(storedAccessToken);
    }
  }, [storedAccessToken]);

  return (
    <main className="l-main">
      <Grid
        className="u-text-align--center"
        style={{ marginTop: 200, marginBottom: 400 }}>
        <GridItem columnStart={1} columnEnd={13}>
          <div className="u-text-align--center u-margin-top--lg">
            <Spinner />
          </div>
        </GridItem>
      </Grid>
    </main>
  );
};

export default EnhanceAuth;
