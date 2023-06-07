import axios from 'axios';

export default async function handler(req, res) {
  const instanceUrl = req.query.server;

  try {
    const response = await axios.post(`${instanceUrl}/oauth/token`, {
      grant_type: 'authorization_code',
      code: req.query.accessToken,
      client_id: req.query.id,
      client_secret: req.query.secret,
      redirect_uri: '/enhance-acount',
      scope: 'write read follow',
    });
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.response.data });
    console.log(error.response.data.error);
  }
}
