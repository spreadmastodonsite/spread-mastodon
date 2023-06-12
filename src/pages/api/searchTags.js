import axios from 'axios';

export default async function searchAccounts(req, res) {
  const { tagName } = req.query;

  try {
    const response = await axios.get(
      `${process.env.MASTODON_INSTANCE_URL}/api/v1/timelines/tag/${tagName}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
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
