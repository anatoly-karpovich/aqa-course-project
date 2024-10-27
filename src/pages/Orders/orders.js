function renderOrdersPageLayout(options = OrdersProps, response = {}) {
  OrdersProps.data = response.data;
  options.tableProps.currentSortingField.direction = state.sorting.orders.sortOrder;
  options.tableProps.currentSortingField.name = replaceApiToFeKeys[state.sorting.orders.sortField];

  const data = _.isEmpty(response.data.Orders) ? [] : transformOrdersForTable(response.data.Orders);

  ProductsProps.data = response.data.Orders;
  state.data.orders = data;

  return `
    <div class="bg-body rounded p-3">
        <div id="${PAGE_TITLE_ID}" class="p-horizontal-20">  
            <div class="page-header-flex">
                ${generatePageTitle(options)}
                ${generateButton(options.buttons.add)}
            </div>
                ${searchBar(options.buttons)}
                ${chipsSection()}
        </div>
    </div>      
    <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
        <div id="${CONTENT_ID}" data-name="table-orders">
            ${generateTableBootstrap(data, options)}
        </div>
    </div>`;
}

const OrdersProps = {
  path: "Orders",
  title: "Orders List",
  classlist: "ml-20 fw-bold",
  buttons: {
    add: {
      classlist: "btn btn-primary page-title-header page-title-button",
      name: "Create Order",
    },
    search: {
      classlist: "btn btn-primary d-flex justify-content-center align-items-center",
      name: `<i class="fa-solid fa-magnifying-glass me-2"></i> Search`,
      id: "search-orders",
      type: "submit",
      disabled: true,
    },
  },
  tableProps: {
    id: "table-orders",
    defaultHeaders: [
      idToOrderNumber._id,
      replaceApiToFeKeys.name,
      replaceApiToFeKeys.email,
      replaceApiToFeKeys.customer,
      replaceApiToFeKeys.price,
      replaceApiToFeKeys.delivery,
      replaceApiToFeKeys.status,
      replaceApiToFeKeys.createdOn,
    ],
    sortableFields: [
      idToOrderNumber._id,
      replaceApiToFeKeys.name,
      replaceApiToFeKeys.email,
      replaceApiToFeKeys.customer,
      replaceApiToFeKeys.price,
      replaceApiToFeKeys.delivery,
      replaceApiToFeKeys.status,
      replaceApiToFeKeys.createdOn,
    ],
    currentSortingField: {
      name: replaceApiToFeKeys.createdOn,
      direction: "desc",
    },
    sortFunction: sortOrdersInTable,
    buttons: [
      {
        nestedItems: `<i class="bi bi-card-text"></i>`,
        title: "Details",
        classlist: "btn btn-link table-btn",
        onclick: "renderOrderDetailsPage",
      },
    ],
  },
};

function addEventListelersToOrdersPage() {
  $("button.page-title-button").on("click", async (e) => {
    e.preventDefault();
    await renderCreateOrderModal();
  });

  $(`#${OrdersProps.buttons.search.id}`).on("click", async (event) => {
    event.preventDefault();
    const value = $(`input[type="search"]`).val();

    $(`input[type="search"]`).val("");
    const searchButton = $("[id*=search-]");
    searchButton.prop("disabled", true);

    if (state.search.orders) {
      removeChipButton("search", "orders");
    }
    if (value) {
      renderChipButton(value, "orders");
    }
    state.search.orders = value;
    // searchInTable("orders");
    await getOrdersAndRenderTable();
  });

  $(`#filter`).on("click", (event) => {
    event.preventDefault();
    renderFiltersModal("orders");
  });
}

function transformOrdersForTable(orders) {
  return orders.map((el) => {
    return {
      [replaceApiToFeKeys._id]: el._id,
      [idToOrderNumber._id]: el._id,
      [replaceApiToFeKeys.name]: el.customer.name,
      [replaceApiToFeKeys.email]: el.customer.email,
      [replaceApiToFeKeys.price]: `$${el.total_price}`,
      [replaceApiToFeKeys.delivery]: el.delivery ? moment(el.delivery.finalDate).format(DATE_FORMAT) : "-",
      [replaceApiToFeKeys.status]: el.status,
      [replaceApiToFeKeys.createdOn]: moment(el.createdOn).format(DATE_AND_TIME_FORMAT),
    };
  });
}

function renderOrdersTable(orders, options) {
  $('[data-name="table-orders"]').html(generateTableBootstrap(transformOrdersForTable(orders), options));
}

async function getOrdersAndRenderTable() {
  showSpinner();
  const sortedOrders = (await getSortedOrders()).data.Orders;
  OrdersProps.tableProps.currentSortingField.direction = state.sorting.orders.sortOrder;
  OrdersProps.tableProps.currentSortingField.name =
    state.sorting.orders.sortField === "_id"
      ? idToOrderNumber[state.sorting.orders.sortField]
      : replaceApiToFeKeys[state.sorting.orders.sortField];
  renderOrdersTable(sortedOrders, OrdersProps);
  hideSpinner();
}
