
async function _createTable(options) {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await posts.json()
    const tabledata = data.map(el => {
        return {Id: el.id, Title: el.title}
    })
    
    //initialize table
    const content = document.querySelector('#contentInner')
    const divForTable = document.createElement('div')
    divForTable.id = "table-of-content"
    content.prepend(divForTable)
    // const table = new Tabulator("#contentInner", {
        const table = new Tabulator("#table-of-content", {
        data:tabledata, //assign data to table
        autoColumns:true, //create columns from data field names
    });

    // const title = document.querySelector('.pageTitle')
    // title.innerText = options.title

    // const titleDiv = document.querySelector('#title')
    // const addButton = document.createElement('button')
    // addButton.classList.add('btn')
    // addButton.classList.add('btn-primary')
    // addButton.classList.add('pageTitle')
    // addButton.innerText = "Add new Order"
    // // titleDiv.appendChild(addButton)
    // Element.prototype.appendAfter = function(element) {
    //     element.parentNode.insertBefore(this, element.nextSibling)
    // }
    // addButton.appendAfter(titleDiv)
    
}
