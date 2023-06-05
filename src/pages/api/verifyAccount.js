import axios from 'axios';

export default async function verifyCredentials(req, res) {
  const { accessToken } = req.body;

  try {
    const response = await axios.get(
      `https://mastodon.social/api/v1/accounts/verify_credentials`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log('Error ❌: ', error.response.data.error);
  }
}
