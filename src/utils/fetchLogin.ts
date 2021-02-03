// Return access token

export function removeAccessTokenFromUrl() {
    const { history, location } = window
    const { search } = location
    if (search && search.indexOf('access-token') !== -1 && history && history.replaceState) {
        // remove access_token from url
        const cleanSearch = search.replace(/(&|\?)access-token([_A-Za-z0-9=.%]+)/g, '').replace(/^&/, '?')
        // replace search params with clean params
        const cleanURL = location.toString().replace(search, cleanSearch)
        // use browser history API to clean the params
        history.replaceState({}, '', cleanURL)
    }
}
