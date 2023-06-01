import axios from 'axios';

export default async function authApp(req, res) {
  const redirectUri = 'http://localhost:3000/finish-auth';
  const clientName = 'Spread Mastodon Social';

  try {
    const appRegistrationResponse = await axios.post(
      `https://mastodon.social/api/v1/apps`,
      {
        redirect_uris: redirectUri,
        client_name: clientName,
        scopes: 'read write follow',
      }
    );
    const { client_id } = appRegistrationResponse.data;

    const authorizationUrl = `https://mastodon.social/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=read+write+follow`;

    res.json({ authorizationUrl });
  } catch (error) {
    console.log('Error =============', error);
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
