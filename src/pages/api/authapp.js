import axios from 'axios';

export default async function authApp(req, res) {
  console.log('MASTODON_INSTANCE_URL:', process.env.MASTODON_INSTANCE_URL);
  const { accessToken } = req.body;

  const { tagName } = req.query;
  try {
    const response = await axios.post(
      `${process.env.MASTODON_INSTANCE_URL}/api/v1/apps/`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
          'Access-Control-Allow-Credential': true,
          'Access-Control-Allow-Origin': '*'
        },
        redirect_uris: 'https://join-mastodon-poc.vercel.app/',
        client_name: req.body.client_id,
        force_login: true,
        scopes: 'write:accounts',
        website: 'https://join-mastodon-poc.vercel.app/'
      },
    ).then(
      response => {
        const options = {
          client_id: response.data.client_id,
          response_type: 'code',
          redirect_uri: 'https://join-mastodon-poc.vercel.app/enhance-account',
          scope: 'write:accounts'
        }
        const queryString = Object.keys(options).map(key => `${key}=${encodeURIComponent(options[key])}`).join('&');
        const loginURI = `https://${response.data.name}/oauth/authorize?${queryString}`
        console.log('response =========', response)
        res.status(200).json({ success: true, data: loginURI });
        //res.redirect(loginURI)
      }
    );
    
  } catch (error) {
    console.log('Error =============',error)
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
