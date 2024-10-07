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
            </div>
                ${searchBar(options.buttons)}
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
      classlist: "btn btn-primary",
      name: `<i class="fa-solid fa-magnifying-glass"></i>`,
      id: "search-orders",
      type: "submit",
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
    if (state.search.orders) {
      removeChipButton("search", "orders");
    }
    if (value) {
      renderChipButton(value, "orders");
    }
    state.search.orders = value;
    // searchInTable("orders");
    await getOrdersAndRenderTable();
    $(`input[type="search"]`).val("");
  });

  $(`#filter`).on("click", (event) => {
    event.preventDefault();
    renderFiltersModal("orders");
  });

  $(`[data-name="table-orders"]`).on("click", async (event) => {
    if (event.target.name === "sort-button") {
      const fieldName = event.target.getAttribute("fieldname");
      const isCurrentSortingField = event.target.getAttribute("current");
      let direction = "asc";
      if (isCurrentSortingField === "true") {
        direction = event.target.getAttribute("direction") === "asc" ? "desc" : "asc";
      }
      state.sorting.orders.sortField =
        Object.keys(replaceApiToFeKeys).find((key) => replaceApiToFeKeys[key] === fieldName) ??
        Object.keys(idToOrderNumber).find((key) => idToOrderNumber[key] === fieldName);
      state.sorting.orders.sortOrder = direction;
      await getOrdersAndRenderTable();
    }
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
  const options = structuredClone(OrdersProps);
  options.tableProps.currentSortingField.direction = state.sorting.orders.sortOrder;
  options.tableProps.currentSortingField.name =
    state.sorting.orders.sortField === "_id"
      ? idToOrderNumber[state.sorting.orders.sortField]
      : replaceApiToFeKeys[state.sorting.orders.sortField];
  renderOrdersTable(sortedOrders, options);
  hideSpinner();
}
