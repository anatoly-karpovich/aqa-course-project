async function renderCustomersPageLayout(options = CustomerProps) {
  options.requestOpts.opts['headers']['Authorization'] = getAuthorizationCookie()
  const response = await getDataFromApi(options.requestOpts);
  if (!response.data.IsSuccess) {
    return renderErrorPageLayout(response.status);
  } else {
    const data = await response.data.Customers.map((el) => {
      return { Id: el._id, Email: el.email, Name: el.name, Country: el.country };
    });
    CustomerProps.data = await response.data.Customers;

    return `      
    <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
      <div id="${PAGE_TITLE_ID}">
        <div class="page-header-flex">
          <h2 class="page-title-text">${options.title}</h2>
          ${options.buttons ? options.buttons.map((el) => `<button class="${el.classlist}">${el.text}</button>`) : ""}
        </div>
        <div id="${CONTENT_ID}">
          ${_.isEmpty(data) ? "" : await generateTableBootstrap(data, options)}
        </div>
      </div>
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
      headers: {}
    },
  },
  buttons: [
    {
      classlist: "btn btn-primary pageTitle page-title-header",
      text: "Add New Customer",
    },
  ],
  tableProps: {
    buttons: [
      {
        name: "Details",
        classlist: "btn btn-link table-btn",
        onclick: "renderCustomerDetailsModal",
      },
      {
        name: "Edit",
        classlist: "btn btn-primary table-action-buttons table-btn",
        onclick: "renderEditCustomerPage",
      },
      {
        name: "Delete",
        classlist: "btn btn-danger table-action-buttons table-btn",
        onclick: "renderDeleteCustomerModal",
      },
    ],
    active: {
      name: "active",
      btnClasslist: "",
      headerClasslist: ""
    }
  },
};

const delete_customer_confirmation_opts = {
  title: "Delete Customer",
  body: "Are you sure you want to delete customer?",
  deleteFunction: "deleteCustomer",
  buttons: {
    success: {
      name: "Yes, Delete",
      id: "delete-customer-modal-btn",
    },
    cancel: {
      name: "Cancel",
      id: "cancel-customer-modal.btn",
    },
  },
};


const customer_details_props = (id) => {
  return {
    id,
    url: ENDPOINTS["Get Customer By Id"](id),
    opts: {
      method: "GET",
      headers: {}
    },
    path: 'Customer',
    buttons: {
      edit: {
        onClickFunc: 'renderEditCustomerPage'
      }
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
  removeConfimationModal();
  showSpinner();
  requestOpts.opts.headers['Authorization'] = getAuthorizationCookie()
  const response = await getDataFromApi(requestOpts);
  await showNotificationAfterDeleteRequest(response, { message: SUCCESS_MESSAGES["Customer Successfully Deleted"]('Customer') }, CustomerProps)
}
