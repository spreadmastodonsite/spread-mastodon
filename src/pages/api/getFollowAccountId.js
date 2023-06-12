import axios from 'axios';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 15,
});

export default async function getFollowAccountId(req, res) {
  const { accessToken, targetAccountUser, searchUrl, server } = req.body;

  try {
    const response = await limiter.schedule(() =>
      axios.get(
        `https://${server}/api/v2/search?q=${targetAccountUser}&type=accounts`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.response.data });
  }
}
