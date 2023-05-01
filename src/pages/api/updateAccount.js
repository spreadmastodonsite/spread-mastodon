import axios from 'axios';

export default async function updateAccount(req, res) {
  const { header, avatar, bio, accessToken } = req.body;
  try {
    const response = await axios.patch(
      `${process.env.MASTODON_INSTANCE_URL}/api/v1/accounts/update_credentials`,
      {
        note: bio,
        avatar: avatar,
        header: header
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log('nope', bio);
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
