import axios from 'axios';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 15,
});

export default async function follow(req, res) {
  const { accessToken, targetAccountId, server } = req.body;

  console.log('🔥 accessToken', accessToken);
  console.log('🔥 targetAccountId', targetAccountId);
  console.log('🔥 server', server);

  try {
    const response = await limiter.schedule(() =>
      axios.post(
        `https://${server}/api/v1/accounts/${targetAccountId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log('❌ Error on follow: ', error.response.data);

    res.status(400).json({ success: false, error: error.response.data });
  }
}
