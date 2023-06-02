import React, { useState, useEffect } from 'react';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Logo from '@/components/atoms/Logo';

const EnhanceComplete = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedData = window.localStorage.getItem('userData');

    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div>
      <main className='l-main'>
        <Grid
          className='u-text-align--center'
          style={{ marginTop: 200, marginBottom: 400 }}
        >
          <GridItem columnStart={1} columnEnd={13}>
            <Logo variant='large' />
            <div className='u-text-align--center u-margin-top--xl'>
              <h3>{userData.username}</h3>
              <h3>{userData.url}</h3>
            </div>
          </GridItem>
        </Grid>
      </main>
    </div>
  );
};

export default EnhanceComplete;
