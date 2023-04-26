import axios from 'axios';

export default async function updateAccount(req, res) {
  const { bio, accessToken } = req.body;

  try {
    const response = await axios.patch(
      `${process.env.MASTODON_INSTANCE_URL}/api/v1/accounts/update_credentials`,
      {
        note: bio,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log('success', bio);

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log('nope', bio);
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
