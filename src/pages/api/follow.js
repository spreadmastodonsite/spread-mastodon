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
    console.log(response.data);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log(error.response.data);
    res.status(400).json({ success: false, error: error.response.data });
  }
}
