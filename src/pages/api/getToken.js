import axios from 'axios';

export default async function getToken(req, res) {
  const { code, m_sec, m_id, server_name } = req.body;

  try {
    const client_id = m_id;
    const client_secret = m_sec;
    const redirect_uri =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/enhance-callback'
        : 'https://join-mastodon-poc.vercel.app/enhance-callback';
    const grant_type = 'authorization_code';

    const response = await axios.post(
      `https://${server_name}/oauth/token`,
      {
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
        code,
        scope: 'read write follow',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('🔥 ressssponseeeeee', response.data);

    const { access_token } = response.data;
    res.status(200).json({ success: true, access_token });
  } catch (error) {
    console.error('Access token request failed:', error);
    res.status(500).json({ success: false, error: error.response.data });
  }
}
