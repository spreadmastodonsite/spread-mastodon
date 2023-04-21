import axios from 'axios';

export default async function follow(req, res) {
  const { accessToken, targetAccountId } = req.body;

  try {
    const response = await axios.post(
      `${process.env.MASTODON_INSTANCE_URL}/api/v1/accounts/${targetAccountId}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.response.data });
  }
}
