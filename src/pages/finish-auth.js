import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Card from '@/components/Organism/Card';

const FinishAuth = () => {
  const router = useRouter();
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const [user, setUser] = useState();
  const [check, setCheck] = useState();
  const { code } = router.query;

  const verifyUserAccount = async (accessToken) => {
    try {
      await axios.post(`/api/verifyAccount`, { accessToken });
      console.log('verifyUserAccount', response.data);
      setUser(response.data.data.acct);
      // return response.data;
    } catch (error) {
      throw new Error('Error verifying account:', error);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axios.post('/api/getToken', { code });
        setStoredAccessToken(res.data.access_token);
      } catch (error) {
        console.log('Error getToken: ', error);
      }
    };
    if (code) {
      getToken();
    }

    if (storedAccessToken) {
      verifyUserAccount(storedAccessToken);
    }
  }, [router.query, code]);

  return (
    <div>
      {storedAccessToken ? (
        <div>
          Token: {storedAccessToken} {user}
        </div>
      ) : (
        <div>Getting access token...</div>
      )}
    </div>
  );
};

export default FinishAuth;
