import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Card from '@/components/Organism/Card';

const FinishAuth = () => {
  const router = useRouter();
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const [user, setUser] = useState();
  const { code } = router.query;

  const getToken = async () => {
    try {
      const m_sec = window.localStorage.getItem('m_sec');
      const m_id = window.localStorage.getItem('m_id');
      const res = await axios.post('/api/getToken', { code, m_sec, m_id });
      setStoredAccessToken(res.data.access_token);
    } catch (error) {
      console.log('Error getToken: ', error);
    }
  };

  const verifyUserAccount = async (accessToken) => {
    try {
      const res = await axios.get(
        `/api/verifyUserAccount?access_token=${accessToken}`
      );
      console.log('User account verified:', res.data);
    } catch (error) {
      console.log('Error verifyUserAccount: ', error);
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
    <div>
      {storedAccessToken ? (
        <div>Token: {storedAccessToken}</div>
      ) : (
        <div>Getting access token...</div>
      )}

      {user ? user : 'No user data yet'}
    </div>
  );
};

export default FinishAuth;
