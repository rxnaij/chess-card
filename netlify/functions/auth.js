const oauth = require('./util/oauth')
require('dotenv').config()

exports.handler = async (event) => {
    if (!event.queryStringParameters) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                error: 'Missing required parameters `url` and `csrf`',
            }),
        };
    }

    const authorizationURI = oauth.authorizeURL({
        redirect_uri: process.env.REDIRECT_URI,
        state: Math.random().toString(36).substring(2),
    
        // for now, this is always blank. in the future, specific scopes will be
        // required to perform actions on the user’s behalf
        scope: '',
      });

    return {
        statusCode: 302,
        headers: {
            Location: authorizationURI,
            'Cache-Control': 'no-cache',
          },
          body: 'redirecting to authorization...',
    }
}