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
      console.log('🔥 code', code);

      const res = await axios.post('/api/getToken', { code });
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
      // Do something with the verified user account data
    } catch (error) {
      console.log('Error verifyUserAccount: ', error);
    }
  };

  useEffect(() => {
    if (code) {
      console.log('🔥 yep, made it here, we have code');

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
