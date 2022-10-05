const SIDEBARID = 'sidebar'
const CONTENTCONTAINERID = 'root'
const contentId = 'contentInner'
const pageTitleId = 'title'

const getDataFromApi = async function(options = {}) {
    let response 
    if(options.method === 'get') {
        response = await fetch(options.url)
        response = await response.json()
    }
    return response
}