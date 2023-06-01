// pages/api/verifyUserAccount.js
import axios from 'axios';

export default async function handler(req, res) {
  const { access_token } = req.query;

  try {
    // Make a request to the Mastodon API to verify the user account
    const response = await axios.get(
      'https://mastodon.social/api/v1/accounts/verify_credentials',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Return the verified user account data
    res.status(200).json(response.data);
  } catch (error) {
    console.log('Error verifying user account: ', error);
    res.status(500).json({ error: 'Failed to verify user account' });
  }
}
