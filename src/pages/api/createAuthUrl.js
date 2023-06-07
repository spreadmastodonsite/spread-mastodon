import axios from 'axios';

export default async function authApp(req, res) {
  const { serverName, redirectUri } = req.body;

  try {
    const appRegistrationResponse = await axios.post(
      `https://${serverName}/api/v1/apps`,
      {
        redirect_uris: redirectUri,
        client_name: 'Spread Mastodon',
        scopes: 'read write follow',
      }
    );

    const { client_id, redirect_uri, client_secret } =
      appRegistrationResponse.data;

    console.log(
      '🔥 appRegistrationResponse.data',
      appRegistrationResponse.data
    );

    const authorizationUrl = `https://${serverName}/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&response_type=code&scope=read+write+follow`;

    res.json({ authorizationUrl, client_id, client_secret });
  } catch (error) {
    console.log('Error: ', error);
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
