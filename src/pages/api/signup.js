import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password, agreement } = req.body;
    const instanceUrl = process.env.MASTODON_INSTANCE_URL;

    try {
      // Get the app access token
      const appTokenResponse = await axios.post(`${req.headers.origin}/api/app-token`);
      const appAccessToken = appTokenResponse.data.data.access_token;

      // Create a new account
      const response = await axios.post(
        `${instanceUrl}/api/v1/accounts`,
        {
          username,
          email,
          password,
          agreement,
          locale: "en",
          reason: "Testing Mastodon signup using Next.js",
        },
        {
          headers: {
            Authorization: `Bearer ${appAccessToken}`,
          },
        }
      );

      res.status(200).json({ success: true, id: response.data.id });
    } catch (error) {
      res.status(400).json({ success: false, error: error.response.data });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
