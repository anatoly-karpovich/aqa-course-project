async function renderCustomersPageLayout(options = CustomerProps) {
    const response = await getDataFromApi(options.requestOpts)
    if(!(response.isSuccess)) {
        return renderErrorPageLayout(response.status)
    } else {
        const data = await response.data.map(el => { 
            return {Id: el.id, Email: el.email, Name: el.name, Country: el.country} 
        })
    
        return `    <div id="${PAGE_TITLE_ID}">
                        <h2 class="pageTitle">${options.title}</h2>
                        ${options.buttons ? options.buttons.map(el => `<button class="${el.classlist}">${el.text}</button>`) : ""}
                    </div>
                    <div id="${CONTENT_ID}">
                      ${_.isEmpty(data) ? "" : await generateTableBootstrap(data)}
                    </div>`
    }

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
    ],
    tableProps: {
       buttons: [
        {
            name: 'Details',
            classlist: 'btn btn-link',
            onclick: 'renderCustomerDetailsPage' 
        }
       ]
    }
  }


  