import axios from "axios";

export default async function searchAccounts(req, res) {
  console.log("MASTODON_INSTANCE:", process.env.MASTODON_INSTANCE);

  const { searchTerm } = req.query;

  try {
    const response = await axios.get(
      `https://${process.env.MASTODON_INSTANCE}/api/v1/accounts/search?q=${searchTerm}`,
      {
        headers: {
          "Authorization": `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
        },
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.response ? error.response.data : error.message });
  }
}
