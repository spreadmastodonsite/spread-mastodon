import axios from 'axios';

export default async function searchAccounts(req, res) {
  // console.log('MASTODON_INSTANCE_URL:', process.env.MASTODON_INSTANCE);
  const { searchTerm, accessTokenEnhance, server } = req.body;

  try {
    const response = await axios.get(
      `https://${server}/api/v1/accounts/search?q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenEnhance}`,
        },
      },
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
