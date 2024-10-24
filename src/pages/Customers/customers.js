async function renderCustomersPageLayout(options = CustomerProps, response) {
  options.tableProps.currentSortingField.direction = state.sorting.customers.sortOrder;
  options.tableProps.currentSortingField.name = replaceApiToFeKeys[state.sorting.customers.sortField];
  const data = _.isEmpty(response.data.Customers) ? [] : transformCustomersForTable(response.data.Customers);

  CustomerProps.data = response.data.Customers;
  state.data.customers = data;
  return `      
    <div class="bg-body rounded p-3">
        <div id="${PAGE_TITLE_ID}" class="p-horizontal-20">  
            <div class="page-header-flex">
                ${generatePageTitle(options)}
            </div>
                ${searchBar(options.buttons)}
        </div>
    </div>      
    <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
        <div id="${CONTENT_ID}" data-name="table-customers">
            ${generateTableBootstrap(data, options)}
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
      type: "submit",
    },
  },
  tableProps: {
    id: "table-customers",
    defaultHeaders: ["Email", "Name", "Country", "Created On"],
    sortableFields: ["Email", "Name", "Country", "Created On"],
    currentSortingField: {
      name: "Created On",
      direction: "desc",
    },
    buttons: [
      {
        nestedItems: `<i class="bi bi-card-text"></i>`,
        title: "Details",
        classlist: "btn btn-link table-btn",
        onclick: "renderCustomerDetailsPage",
      },
      {
        nestedItems: `<i class="bi bi-pencil"></i>`,
        title: "Edit",
        classlist: "btn btn-link table-btn",
        onclick: "renderEditCustomerPage",
      },
      {
        nestedItems: `<i class="bi bi-trash"></i>`,
        title: "Delete",
        classlist: "btn btn-link text-danger table-btn",
        onclick: "renderDeleteCustomerModal",
      },
    ],
    active: {
      name: "active",
      btnClasslist: "",
      headerClasslist: "",
    },
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
    path: "Customer",
    buttons: {
      edit: {
        onClickFunc: `renderEditCustomerPage`,
      },
    },
  };
};

async function deleteCustomer(id) {
  removeConfimationModal();
  showSpinner();
  const response = await CustomersService.deleteCustomer(id);
  await showNotificationAfterDeleteRequest(
    response,
    { message: SUCCESS_MESSAGES["Customer Successfully Deleted"]("Customer") },
    CustomerProps
  );
}

function addEventListelersToCustomersPage() {
  $("button.page-title-button").on("click", () => renderAddNewCustomerPage());
  $(`#${CustomerProps.buttons.search.id}`).on("click", async (event) => {
    event.preventDefault();
    const value = $(`input[type="search"]`).val();
    if (state.search.customers) {
      removeChipButton("search", "customers");
    }
    if (value) {
      renderChipButton(value, "customers");
    }
    state.search.customers = value;
    await getCustomersAndRenderTable();
    $(`input[type="search"]`).val("");
  });
  $(`#filter`).on("click", (event) => {
    event.preventDefault();
    renderFiltersModal("customers");
  });

  $(`[data-name="table-customers"]`).on("click", async (event) => {
    if (event.target.name === "sort-button") {
      const fieldName = event.target.getAttribute("fieldname");
      const isCurrentSortingField = event.target.getAttribute("current");
      let direction = "asc";
      if (isCurrentSortingField === "true") {
        direction = event.target.getAttribute("direction") === "asc" ? "desc" : "asc";
      }
      state.sorting.customers.sortField = Object.keys(replaceApiToFeKeys).find(
        (key) => replaceApiToFeKeys[key] === fieldName
      );
      state.sorting.customers.sortOrder = direction;
      await getCustomersAndRenderTable();
    }
  });
}

function transformCustomersForTable(customers) {
  return customers.map((el) => {
    return {
      [replaceApiToFeKeys._id]: el._id,
      [replaceApiToFeKeys.email]: el.email,
      [replaceApiToFeKeys.name]: el.name,
      [replaceApiToFeKeys.country]: el.country,
      [replaceApiToFeKeys.createdOn]: moment(el.createdOn).format(DATE_AND_TIME_FORMAT),
    };
  });
}

function renderCustomersTable(customers, options) {
  $('[data-name="table-customers"]').html(generateTableBootstrap(transformCustomersForTable(customers), options));
}

async function getCustomersAndRenderTable() {
  showSpinner();
  const sortedCustomers = (await getSortedCustomers()).data.Customers;
  const options = structuredClone(CustomerProps);
  options.tableProps.currentSortingField.direction = state.sorting.customers.sortOrder;
  options.tableProps.currentSortingField.name = replaceApiToFeKeys[state.sorting.customers.sortField];
  renderCustomersTable(sortedCustomers, options);
  hideSpinner();
}
