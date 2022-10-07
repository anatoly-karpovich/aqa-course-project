async function renderOrderPageLayout(options = OrderProps) {

    const data = await getDataFromApi(options)

    return `    <div id="${PAGE_TITLE_ID}">
                    <h2 class="pageTitle">${options.title}</h2>
                    ${options.buttons ? options.buttons.map(el => `<button class="${el.classlist}">${el.text}</button>`) : ""}
                </div>
                <div id="${CONTENT_ID}">
                  ${await generateTableBootstrap(data)}
                </div>`
}

const OrderProps = {
    path: 'Orders',
    url: "https://jsonplaceholder.typicode.com/posts",
    method: 'get',
    title: 'Orders List',
    buttons: [
        {
            classlist: "btn btn-primary pageTitle",
            text: "Add New Order"
        }
    ]
  }

  function addEventListeners() {
    document.querySelector('th').addEventListener('click', () => {

    })
  }