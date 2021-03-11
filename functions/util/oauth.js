const { AuthorizationCode } = require('simple-oauth2')

function createAuthClient(credentials) {
    if (!credentials.client.id || !credentials.client.secret) {
        throw new Error(
            'Missing a valid Lichess OAuth client ID and secret.'
        )
    }
    return new AuthorizationCode(credentials)
}

module.exports = createAuthClient({
    client: {
        id: process.env.LICHESS_CLIENT_ID,
        secret: process.env.LICHESS_CLIENT_SECRET
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