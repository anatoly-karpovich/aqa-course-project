const SIDEBAR_ID = 'sidebar'
const CONTENTCONTAINERID = 'root'
const CONTENT_ID = 'contentInner'
const PAGE_TITLE_ID = 'title'

const getDataFromApi = async function(options = {}) {
    let response 
    if(options.method === 'get') {
        response = await fetch(options.url)
        response = await response.json()
    }
    return response
}