import oauth from 'simple-oauth2'

const port = 3000

async function requestAuth () { 
    const client = new oauth.AuthorizationCode({
        client: {
            id: process.env.LICHESS_CLIENT_ID!,
            secret: process.env.LICHESS_CLIENT_SECRET!
        },
        auth: {
            tokenHost: 'https://oauth.lichess.org',
            authorizePath: '/oauth/authorize',
            tokenPath: '/oauth'
        },
        http: {
            json: true
        }
    })
    const redirectUri = `http://localhost:${port}/callback`
    const authorizationUri = client.authorizeURL({
        redirect_uri: redirectUri,
        scope: ['preference:read'], // see https://lichess.org/api#section/Introduction/Rate-limiting
        state: Math.random().toString(36).substring(2)
    })
    console.log(authorizationUri)
    // const token = await client.getToken({
    //     code: ,
    //     redirect_uri: redirectUri
    // })
}

export default requestAuth
