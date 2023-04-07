import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, username, password, agreement } = req.body;
    const instanceUrl = process.env.MASTODON_INSTANCE_URL;
    const accessToken = process.env.MASTODON_ACCESS_TOKEN;

    try {
      const response = await axios.post(
        `${instanceUrl}/api/v1/accounts`,
        {
          email,
          username,
          password,
          agreement,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      res.status(400).json({ success: false, error: error.response.data });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
