async function renderCustomersPageLayout(options = CustomerProps) {

    const data = (await getDataFromApi(options.requestOpts)).map(el => { 
        return {Id: el.id, Email: el.email, Name: el.name, Countrt: el.country, City: el.city, Address: el.address, Phone: el.phone, ['Registration Date']: el.date_create} 
    })

    return `    <div id="${PAGE_TITLE_ID}">
                    <h2 class="pageTitle">${options.title}</h2>
                    ${options.buttons ? options.buttons.map(el => `<button class="${el.classlist}">${el.text}</button>`) : ""}
                </div>
                <div id="${CONTENT_ID}">
                  ${await generateTableBootstrap(data)}
                </div>`
}

const CustomerProps = {
    path: 'Customers',
    title: 'Customers List',
    requestOpts: {
        url: ENDPOINTS['Customers'],
        opts: {
            method: 'GET',
        }
    },
    buttons: [
        {
            classlist: "btn btn-primary pageTitle",
            text: "Add New Customer"
        }
    ]
  }

  function addEventListeners() {
    document.querySelector('th').addEventListener('click', () => {

    })
  }