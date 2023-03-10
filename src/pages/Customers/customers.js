async function renderCustomersPageLayout(options = CustomerProps, response) {
  const defaultHeaders = ["Email", "Name", "Country"];
  let data;
  if (!_.isEmpty(response.data.Customers)) {
    data = response.data.Customers.map((el) => {
      return { Id: el._id, Email: el.email, Name: el.name, Country: el.country };
    });
  }
  CustomerProps.data = response.data.Customers;

    return `      
    <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
      <div id="${PAGE_TITLE_ID}">
        <div class="page-header-flex">
          ${generatePageTitle(options)}
        </div>
          ${searchBar(options.buttons)}
        <div id="${CONTENT_ID}">
          ${generateTableBootstrap(data, options)}
        </div>
      </div>
    </div>`;
  }

const CustomerProps = {
  path: "Customers",
  title: "Customers List",
  classlist: "ml-20 fw-bold",
  buttons: {
    add: {
      classlist: "btn btn-primary pageTitle page-title-header page-title-button",
      name: "+ Add Customer",
    },
    search: {
      classlist: "btn btn-primary",
      name: `<i class="fa-solid fa-magnifying-glass"></i>`,
      id: "search-customer",
      type: "submit"
    }
  },    
  tableProps: {
    id: "table-customers",
    defaultHeaders: ["Email", "Name", "Country"],
    buttons: [
      {
        nestedItems: `<i class="bi bi-card-text"></i>`,
        title: 'Details',
        classlist: "btn btn-link table-btn",
        onclick: "renderCustomerDetailsModal",
      },
      {
        nestedItems: `<i class="bi bi-pencil"></i>`,
        title: 'Edit',
        classlist: "btn btn-link table-btn",
        onclick: "renderEditCustomerPage",
      },
      {
        nestedItems: `<i class="bi bi-trash-fill"></i>`,
        title: 'Delete',
        classlist: "btn btn-link text-danger table-btn",
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
    path: 'Customer',
    buttons: {
      edit: {
        onClickFunc: `renderEditCustomerPage`
      }
    }
  }
}

async function deleteCustomer(id) {
  removeConfimationModal();
  showSpinner();
  const response = await CustomersService.deleteCustomer(id);
    await showNotificationAfterDeleteRequest(response, { message: SUCCESS_MESSAGES["Customer Successfully Deleted"]('Customer') }, CustomerProps);
}

function addEventListelersToCustomersPage() {
  $("button.page-title-button").on("click", () => renderAddNewCustomerPage());
  $(`#${CustomerProps.buttons.search.id}`).on('click', (event) => {
    event.preventDefault();
    searchInTable()
  })
}