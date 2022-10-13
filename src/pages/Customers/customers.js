async function renderCustomersPageLayout(options = CustomerProps) {
  const response = await getDataFromApi(options.requestOpts);
  if (!response.isSuccess) {
    return renderErrorPageLayout(response.status);
  } else {
    const data = await response.data.map((el) => {
      return { Id: el.id, Email: el.email, Name: el.name, Country: el.country };
    });
    CustomerProps.data = await response.data

    return `    <div id="${PAGE_TITLE_ID}">
                        <h2 class="pageTitle">${options.title}</h2>
                        ${options.buttons ? options.buttons.map((el) => `<button class="${el.classlist}">${el.text}</button>`) : ""}
                    </div>
                    <div id="${CONTENT_ID}">
                      ${_.isEmpty(data) ? "" : await generateTableBootstrap(data)}
                    </div>`;
  }
}

const CustomerProps = {
  path: "Customers",
  title: "Customers List",
  requestOpts: {
    url: ENDPOINTS["Customers"],
    opts: {
      method: "GET",
    },
  },
  buttons: [
    {
      classlist: "btn btn-primary pageTitle",
      text: "Add New Customer",
    },
  ],
  tableProps: {
    buttons: [
      {
        name: "Details",
        classlist: "btn btn-link",
        onclick: "renderCustomerDetailsPage",
      },
    ],
  },
};

const delete_customer_confirmation_opts = {
    title: 'Delete Customer',
    body: 'Are you sure you want to delete customer?',
    buttons: {
        success: {
            name: 'Yes, Delete',
            id: 'delete-customer-modal-btn'
        },
        cancel: {
            name: 'Cancel',
            id: 'cancel-customer-modal.btn'
        }
    }
}

async function deleteCustomer(id) {
  const requestOpts = {
    url: ENDPOINTS["Get Customer By Id"](id),
    opts: {
      method: "DELETE",
      body: "",
      headers: {
        ["Content-Type"]: "application/json",
      },
    },
  };
  removeConfimationModal()

  const spinner = document.querySelector(`.overlay`);
  spinner.style.display = "block";


  const response = await getDataFromApi(requestOpts);
  if (response.status === 204) {
    await renderCustomersPage(CustomerProps);
    renderNotification({ message: SUCCESS_MESSAGES["Customer Successfully Deleted"]('Customer') });
  } else {
    renderNotification({ message: response.data.errors ? convertApiErrors(response.data.errors) : `Connection issue. Customer wasn't updated.` });
  }
}
