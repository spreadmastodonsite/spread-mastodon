import axios from 'axios';
import { OAuth2 } from 'oauth'
import readline from 'readline'

import Mastodon from 'mastodon-api'

export default async function authApp(req, res) {
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // })

  // let clientId
  // let clientSecret


  // Mastodon.createOAuthApp(`https://mastodon.social/api/v1/apps`, req.body.client_id)
  //   .catch((err) => console.error(err))
  //   .then((res) => {
  //       console.log('Please save \'id\', \'client_id\' and \'client_secret\' in your program and use it from now on!')
  //       console.log(res)

  //       clientId = res.client_id
  //       clientSecret = res.client_secret

  //       return Mastodon.getAuthorizationUrl(clientId, clientSecret, `https://${req.body.client_id}`)
  //   })
  //   .then((url) => {
  //       console.log('This is the authorization URL. Open it in your browser and authorize with your account!')
  //       console.log(url)
  //       require('child_process').exec(`start ${url}`);
  //       return new Promise((resolve) => {
  //           rl.question('Please enter the code from the website: ', (code) => {
  //               resolve(code)
  //               rl.close()
  //           })
  //       })
  //   })
  //   .then((code) => Mastodon.getAccessToken(clientId, clientSecret, code))
  //   .catch((err) => console.error(err))
  //   .then((accessToken) => {
  //       console.log(`This is the access token. Save it!\n${accessToken}`)
  //   })
  console.log(req.body );
  try {
    const response = await axios.post(
      `https://${req.body.client_id}/api/v1/apps`,
      {
        redirect_uris: 'https://join-mastodon-poc.vercel.app/enhance-account',
        client_name: req.body.client_id,
        scopes: 'write follow',
        website: 'https://join-mastodon-poc.vercel.app',
      },
    ).then(
      response => {
        console.log('toekn', response.data)
        const oauth = new OAuth2(response.data.client_id, response.data.client_secret, `https://${response.data.name}`, null, '/oauth/authorize')
        const url = oauth.getAuthorizeUrl({
            grant_type: 'authorization_code',
            redirect_uri: 'https://join-mastodon-poc.vercel.app/enhance-account',
            response_type: 'code',
            client_id: response.data.client_id,
            scopes: 'write follow',
        })
        res.status(200).json({ success: true, data: url, client:[ { id: response.data.client_id, secret: response.data.client_secret}] });
      }
    )
    // .then(
    //   response => {
    //     console.log(response.data)
    //     const options = {
    //       client_id: response.data.client_id,
    //       client_secret: response.data.client_secret,
    //       instance: response.data.name,
    //       response_type: 'code',
    //       redirect_uri: 'http://localhost:3000/enhance-account',
    //       scope: 'read write follow'
    //     }
    //     const queryString = Object.keys(options).map(key => `${key}=${encodeURIComponent(options[key])}`).join('&');
    //     const loginURI = `https://${response.data.name}/oauth/authorize?${queryString}`
    //     console.log('response =========', response)
    //     res.status(200).json({ success: true, data: loginURI });
    //     //res.redirect(loginURI)

       
    //   }
    // );
    
  } catch (error) {
    console.log('Error =============',error)
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
