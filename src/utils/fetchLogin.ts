import { Rating } from '../types'

export async function fetchData(accessToken: string, action: (username: string, ratings: Rating[]) => void) {
    const user = await fetch('https://lichess.org/api/account', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(res => res.json())
    try {
        const { username, perfs } = user
        const newRatings: Rating[] = Object.getOwnPropertyNames(perfs)
            .filter(p => perfs[p].games > 0)
            .map((p: string) => ({
                name: p,
                points: perfs[p].rating
            }))
        action(username, newRatings)
    } catch (error) {
        console.error("Error: user is undefined. Token is probably undefined.")
    }

}

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
