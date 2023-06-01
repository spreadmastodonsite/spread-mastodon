import axios from 'axios';

export default async function verifyCredentials(req, res) {
  const { accessToken } = req.body;
  console.log('🔥 accessToken', accessToken);

  try {
    const response = await axios.get(
      `https://mastodon.social/api/v1/accounts/verify_credentials`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log('🔥 response', response);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log('Error ❌: ', error.response.data.error);
  }
}

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     console.log(req);
//     const { accessToken } = req.query;
//     const instanceUrl = process.env.MASTODON_INSTANCE_URL;

//     try {
//       const response = await axios.get(
//         `${instanceUrl}/api/v1/accounts/verify_credentials`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       console.log('verifyAccountAPI', response.data);
//       res.status(200).json({ success: true, data: response.data });
//     } catch (error) {
//       res.status(400).json({ success: false, error: error.response.data });
//       console.log('verifyAccountAPI', error.response.data.error);
//     }
//   } else {
//     res.status(405).json({ success: false, message: 'Method not allowed' });
//   }
// }
