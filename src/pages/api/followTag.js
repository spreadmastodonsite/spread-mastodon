import axios from 'axios';

export default async function follow(req, res) {
  const { accessToken, tagName, server } = req.body;

  try {
    const response = await axios.post(
      `https://${server}/api/v1/tags/${tagName}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
}
