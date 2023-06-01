import axios from 'axios';

export default async function getToken(req, res) {
  const { code } = req.body;

  try {
    const client_id = 'NRQIMMaWJPxCsFD6jZRSO-md9tb8VN8T6yKqJMhdcs4';
    const client_secret = 'w6VJzI-myOqf0oxDcdcEU58v26XMh4NKp2deQPTqcWA';
    const redirect_uri = 'https://mastodon.social/finish-auth';
    const grant_type = 'client_credentials';

    const response = await axios.post('https://mastodon.social/oauth/token', {
      client_id,
      client_secret,
      redirect_uri,
      grant_type,
      code,
    });

    const { access_token } = response.data;

    res.status(200).json({ success: true, access_token });
  } catch (error) {
    console.error('Access token request failed:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to obtain access token' });
  }
}
