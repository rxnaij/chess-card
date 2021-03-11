const oauth = require('./util/oauth.js')

exports.handler = async (event) => {
    /* state helps mitigate CSRF attacks & Restore the previous state of your app */
    const { code } = event.queryStringParameters

    try {
        /* Take the grant code and exchange for an accessToken */
        const { token } = await oauth.authorizationCode.getToken({
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            client_id: process.env.LICHESS_CLIENT_ID,
            client_secret: process.env.LICHESS_CLIENT_SECRET
        })

        return {
            statusCode: 302,
            headers: {
                Location: `${process.env.FRONTEND_URI}?access-token=${token.access_token}`,
                'Cache-Control': 'no-cache'
            }
        }
        
    } catch (error) {
        console.error('Access token error', error.message)
        
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}