import axios from 'axios';

export default async function handler(req, res) {
  const { token, server_name } = req.body;

  try {
    // Make a request to the Mastodon API to verify the user account
    const response = await axios.get(
      `https://${server_name}/api/v1/accounts/verify_credentials`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Return the verified user account data
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify user account' });
  }
}
